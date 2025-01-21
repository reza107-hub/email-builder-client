import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { api } from "../services/api";
import EmailBuilderEditor from "../components/EmailBuilderEditor/EmailBuilderEditor";
import TestSetting from "../components/TestSetting/TestSetting";
import { Link } from "react-router-dom";

const EmailBuilder = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [emailData, setEmailData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [titleSettings, setTitleSettings] = useState({
    textAlign: "left",
    color: "#000000",
    fontSize: "16px",
    fontWeight: "normal",
  });
  const [contentSettings, setContentSettings] = useState({
    textAlign: "left",
    color: "#000000",
    fontSize: "16px",
    fontWeight: "normal",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTitleSettingsChange = (e) => {
    const { name, value } = e.target;
    setTitleSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentSettingsChange = (e) => {
    const { name, value } = e.target;
    setContentSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add function to compile template with current settings

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await api.uploadImage(file);
        setEmailData((prev) => ({
          ...prev,
          image: response.imageUrl,
        })); // Assuming the response contains the URL in a 'url' field
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleUpdateConfig = async () => {
    const data = {
      logoUrl: emailData.image,
      title: emailData.title,
      body: emailData.content,
      titleSettings,
      contentSettings,
    };
    try {
      const response = await api.updateConfig(data);
      setHtmlContent(response.html);
    } catch (error) {
      console.error("Error updating template:", error);
      alert("Error updating template");
    }
  };

  const handleDownloadTemplate = async () => {
    const data = {
      logoUrl: emailData.image,
      title: emailData.title,
      body: emailData.content,
      titleSettings,
      contentSettings,
    };
    try {
      await api.renderAndDownloadTemplate(data);
    } catch (error) {
      console.error("Error downloading template:", error);
    }
  };

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await api.getEmailLayout();
        const initialHtml = response.layout
          .replace("{{logoUrl}}", "")
          .replace("{{title}}", "Your Title")
          .replace("{{body}}", "Your Content")
          .replace("{{titleColor}}", titleSettings.color)
          .replace("{{titleFontSize}}", titleSettings.fontSize)
          .replace("{{titleAlign}}", titleSettings.textAlign)
          .replace("{{titleFontWeight}}", titleSettings.fontWeight)
          .replace("{{contentColor}}", contentSettings.color)
          .replace("{{contentFontSize}}", contentSettings.fontSize)
          .replace("{{contentAlign}}", contentSettings.textAlign)
          .replace("{{contentFontWeight}}", contentSettings.fontWeight);
        setHtmlContent(initialHtml);
      } catch (error) {
        console.error("Error fetching layout:", error);
      }
    };

    fetchLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200">
              <IoMdArrowRoundBack className="h-5 w-5 mr-2" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Email Builder
            </h1>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </nav>

      {/* main content */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* editor section */}

          <div>
            <EmailBuilderEditor
              emailData={emailData}
              handleImageUpload={handleImageUpload}
              handleInputChange={handleInputChange}
              handleSettingsChange={handleTitleSettingsChange}
              textSettings={titleSettings}
            />

            <div>
              {/* title settings */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Title Settings
                </h2>
                <TestSetting
                  label="Title Settings"
                  textSettings={titleSettings}
                  handleSettingsChange={handleTitleSettingsChange}
                />
              </div>

              {/* content settings */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Content Settings
                </h2>
                <TestSetting
                  label="Content Settings"
                  textSettings={contentSettings}
                  handleSettingsChange={handleContentSettingsChange}
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleUpdateConfig}
                  className="btn btn-primary"
                >
                  Update Config
                </button>
              </div>
            </div>
          </div>
          {/* preview */}
          <div>
            <h2 className="text-center text-lg lg:text-5xl font-semibold mb-6">
              Preview
            </h2>
            <div className="border rounded-lg p-6">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
            <div className="pt-6 text-center">
              <button
                onClick={handleDownloadTemplate}
                className="btn btn-secondary hover:btn-primary"
              >
                Download Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailBuilder;
