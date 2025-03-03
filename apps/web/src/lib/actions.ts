"use server";

import { Resend } from "resend";

export async function sendEmail(
  args: string
): Promise<
  { success: false; error: string } | { success: true; data: string }
> {
  "use server";

  if (
    typeof process.env.RESEND === "undefined" ||
    typeof process.env.FEEDBACK_ADDRESSES === "undefined" ||
    typeof args === "undefined"
  ) {
    console.error("Provide env vars for resend or an function argument.");
    return { success: false, error: "Check server logs!" };
  }

  const resend = new Resend(process.env.RESEND);
  const { feedbackType, text } = JSON.parse(args) as {
    feedbackType: string;
    text: string;
  };

  const { data, error } = await resend.emails.send({
    from: "Buergergeldrechner.io <onboarding@resend.dev>",
    to: process.env.FEEDBACK_ADDRESSES.split(" ") ?? ["delivered@resend.dev"],
    subject: `Feedback von buergergeld.io - ${feedbackType}`,
    html: text,
  });

  if (error) {
    console.log(error);
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }

  return {
    success: true,
    data: JSON.stringify(data),
  };
}
