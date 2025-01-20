
const TestSetting = ({ textSettings, handleSettingsChange, label }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex space-x-4">
        <select
          name="textAlign"
          value={textSettings.textAlign}
          onChange={handleSettingsChange}
          className="border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
        <input
          type="color"
          name="color"
          value={textSettings.color}
          onChange={handleSettingsChange}
          className="border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="number"
          name="fontSize"
          value={textSettings.fontSize.replace("px", "")}
          onChange={(e) =>
            handleSettingsChange({
              target: {
                name: "fontSize",
                value: `${e.target.value}px`,
              },
            })
          }
          className="border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-16 text-center"
          placeholder="Font Size"
        />
        <select
          name="fontWeight"
          value={textSettings.fontWeight}
          onChange={handleSettingsChange}
          className="border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-24 text-center"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="600">SemiBold</option>
        </select>
      </div>
    </div>
  );
};

export default TestSetting;
