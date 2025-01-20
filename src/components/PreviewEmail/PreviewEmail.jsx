const PreviewEmail = ({
  titleSettings,
  contentSettings,
  footerSettings,
  emailData,
}) => {
  return (
    <div>
      <div className="p-6">
        <h2 className="text-center text-lg lg:text-5xl font-semibold mb-6">
          Preview
        </h2>
        <div className="border rounded-lg p-6">
          <div
            style={{
              textAlign: titleSettings.textAlign,
              color: titleSettings.color,
              fontSize: titleSettings.fontSize,
              fontWeight: titleSettings.fontWeight,
            }}
          >
            {emailData.title
              ? emailData.title
              : "Your Title will be shown here"}
          </div>
          {emailData.image ? (
            <img
              src={emailData.image}
              alt="Email content"
              className="mb-4 max-w-full rounded-lg"
            />
          ) : (
            "Your Image will be shown here"
          )}
          <div
            className="prose max-w-none mb-4 whitespace-pre-wrap"
            style={{
              textAlign: contentSettings.textAlign,
              color: contentSettings.color,
              fontSize: contentSettings.fontSize,
              fontWeight: contentSettings.fontWeight,
            }}
          >
            {emailData.content || "Your email content will appear here"}
          </div>
          <div
            className="text-sm text-gray-600 border-t pt-4"
            style={{
              textAlign: footerSettings.textAlign,
              color: footerSettings.color,
              fontSize: footerSettings.fontSize,
              fontWeight: footerSettings.fontWeight,
            }}
          >
            {emailData.footer || "Your footer text will appear here"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewEmail;
