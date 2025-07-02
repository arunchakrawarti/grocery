import { useRef, useState, useContext } from "react";
import { assets, categories } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { axios } = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const fileInputsRef = useRef([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !offerPrice || !category || files.length === 0 || files.some(f => !f)) {
      return toast.error("Please fill all fields and upload at least one image");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    formData.append("category", category);

    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/product/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message || "Product added");
        // Reset form
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setOfferPrice("");
        setFiles([]);
        fileInputsRef.current.forEach(input => {
          if (input) input.value = null;
        });
      } else {
        toast.error(res.data.message || "Failed to add product");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  ref={(el) => fileInputsRef.current[index] = el}
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  accept="image/*"
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <img
                  className="max-w-24 cursor-pointer"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt="uploadArea"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-name" className="text-base font-medium">Product Name</label>
          <input
            id="product-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-description" className="text-base font-medium">Product Description</label>
          <textarea
            id="product-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            required
          />
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="category" className="text-base font-medium">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.path}>{cat.path}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label htmlFor="product-price" className="text-base font-medium">Product Price</label>
            <input
              id="product-price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-1 w-32">
            <label htmlFor="offer-price" className="text-base font-medium">Offer Price</label>
            <input
              id="offer-price"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        <button type="submit" className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
