export function toTitleCase(str: string): string {
  if (!str) return str;

  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const copyToClipboard = (textToCopy: string, callback: (res: { status: string; message: string }) => void) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        callback({
          status: "success",
          message: "Copied!",
        });
      })
      .catch((err) => {
        callback({
          status: "error",
          message: "Failed to copy!",
        });
        console.error("Failed to copy text to clipboard:", err);
      });
  } else {
    // Fallback for older browsers
    try {
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      textarea.style.position = "fixed"; // Avoid scrolling to bottom
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      callback({
        status: "success",
        message: "Copied!",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      callback({
        status: "error",
        message: "Failed to copy!",
      });
    }
  }
};
