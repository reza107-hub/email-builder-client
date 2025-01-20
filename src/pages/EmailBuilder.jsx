import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { api } from "../services/api";
import PreviewEmail from "../components/PreviewEmail/PreviewEmail";
import EmailBuilderEditor from "../components/EmailBuilderEditor/EmailBuilderEditor";
import TestSetting from "../components/TestSetting/TestSetting";

const EmailBuilder = () => {
  const [emailData, setEmailData] = useState({
    title: "",
    content: "",
    footer: "",
    image: null,
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
  const [footerSettings, setFooterSettings] = useState({
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

  const handleFooterSettingsChange = (e) => {
    const { name, value } = e.target;
    setFooterSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200">
              <IoMdArrowRoundBack className="h-5 w-5 mr-2" />
              <span>Back to Home</span>
            </button>
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
          <EmailBuilderEditor
            emailData={emailData}
            handleImageUpload={handleImageUpload}
            handleInputChange={handleInputChange}
            handleSettingsChange={handleTitleSettingsChange}
            textSettings={titleSettings}
          />

          {/* preview */}
          <PreviewEmail
            emailData={emailData}
            titleSettings={titleSettings}
            contentSettings={contentSettings}
            footerSettings={footerSettings}
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

            {/* footer settings */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Footer Settings
              </h2>
              <TestSetting
                label="Footer Settings"
                textSettings={footerSettings}
                handleSettingsChange={handleFooterSettingsChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailBuilder;
