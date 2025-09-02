"use client";

import { FormEvent, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/redux/hooks";
import {
  setSubscriptionEmail,
  setSubscriptionSubmitting,
  setSubscriptionError,
  setSubscriptionSuccess,
} from "@/redux/slices/formSlice";
import { SubscriptionFormProps } from "./types";
import { Alert } from "@/components/common";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function SubscriptionForm() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
    isVisible: boolean;
  }>({
    type: "success",
    message: "",
    isVisible: false,
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("footer.emailInvalid"))
      .required(t("footer.emailRequired")),
  });

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({
      type,
      message,
      isVisible: true,
    });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, isVisible: false }));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      hideAlert();
      dispatch(setSubscriptionSubmitting(true));
      dispatch(setSubscriptionEmail(values.email));

      try {
        // Call the Strapi API
        const response = await fetch(`${API_BASE_URL}/api/subscribers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              email: values.email,
            },
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          // Handle API error response
          let errorMessage = t("footer.subscribeError");

          if (result.error) {
            if (result.error.message === "This attribute must be unique") {
              errorMessage = t("footer.subscribeError");
            } else {
              errorMessage = result.error.message || errorMessage;
            }
          }

          showAlert("error", errorMessage);
          dispatch(setSubscriptionError(errorMessage));
          throw new Error(errorMessage);
        }

        // Success response
        const successMessage = t("footer.subscribeSuccess");
        showAlert("success", successMessage);
        dispatch(setSubscriptionSuccess(successMessage));
        formik.resetForm();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : t("footer.subscribeError");

        if (!alert.isVisible) {
          showAlert("error", errorMessage);
        }
        dispatch(setSubscriptionError(errorMessage));
      } finally {
        setIsSubmitting(false);
        dispatch(setSubscriptionSubmitting(false));
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit(e as FormEvent<HTMLFormElement>);
  };

  return (
    <>
      {/* Alert Component */}
      <Alert
        type={alert.type}
        message={alert.message}
        isVisible={alert.isVisible}
        onClose={hideAlert}
        autoClose={true}
        autoCloseDelay={5000}
      />

      <div className="">
        <form onSubmit={handleSubmit} className="max-w-[250px] h-[41px]">
          {/* White Container with Email Input and Subscribe Button */}
          <div className="bg-white rounded-md shadow-lg p-1 flex items-center">
            <div className="flex-1">
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t("footer.subscribePlaceholder")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full h-full text-sm px-1 text-gray-900 placeholder-gray-500 border-0 bg-transparent focus:outline-none focus:ring-0 ${
                  formik.touched.email && formik.errors.email
                    ? "text-red-600"
                    : ""
                }`}
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 cursor-pointer bg-primary hover:bg-tertiary text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-sm hover:shadow-md"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("footer.subscribe")}...
                </span>
              ) : (
                t("footer.subscribe")
              )}
            </button>
          </div>

          {/* Error Message */}
          {formik.touched.email && formik.errors.email && (
            <p className="mt-2 text-sm text-red-400 font-medium">
              {formik.errors.email}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
