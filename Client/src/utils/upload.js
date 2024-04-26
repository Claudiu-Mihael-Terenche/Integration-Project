import axios from "axios";

const upload = async (file, resourceType) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "offerme");
  data.append("resource_type", resourceType); // Add resource type to the FormData

  try {
    const res = await axios.post(import.meta.env.VITE_UPLOAD_LINK, data);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
