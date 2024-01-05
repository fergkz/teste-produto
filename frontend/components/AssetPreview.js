export default function AssetPreview({ asset }) {
  const filename = asset.path.substring(
    asset.path.lastIndexOf("/") + 1,
    asset.path.length
  );

  const handleClick = async () => {
    const response = await fetch(`//${asset.path}`);

    if (response.status !== 200) {
      console.error(response.status, response.statusText);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <div
      onClick={() => handleClick()}
      className="p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 aspect-square">
      <div className="h-full mx-auto">
        {asset.type.includes("image") ? (
          <img
            className="object-contain object-center w-full h-full"
            src={`//${asset.path}`}
          />
        ) : (
          <svg
            className="h-full m-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
            <path d="M7 11l5 5l5 -5" />
            <path d="M12 4l0 12" />
          </svg>
        )}
      </div>
      <label className="block text-center">{filename}</label>
    </div>
  );
}
