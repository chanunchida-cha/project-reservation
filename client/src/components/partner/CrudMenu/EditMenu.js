import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { partnerStore } from "../../Store/partnerStore";
import { useParams, useHistory } from "react-router-dom";

const EditMenu = observer(() => {
  const history = useHistory();
  const { id } = useParams();
  const [menu, setMenu] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [partnerId, setPartnerId] = useState(null);
  const [image, setimage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageChange, setImageChange] = useState(false);

  useEffect(async () => {
    await partnerStore.getMenuById(id);
    return (
      setMenu({
        name: partnerStore.menu.name,
        description: partnerStore.menu.description,
        price: partnerStore.menu.price,
      }),
      setPartnerId(partnerStore.menu.partner_id),
      setimage(partnerStore.menu.image)
    );
  }, []);

  console.log(partnerId);
  console.log(image);
  console.log(menu);

  const showPreview = (e) => {
    if (e.target.files[0]) {
      let imageFile = e.target.files[0];
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);
      setImageChange(true);
      console.log(objectUrl);
      setimage(imageFile);
    } else {
      setimage(image);
    }
  };

  const updateMenu = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("partner_id", partnerId);
    formData.append("name", menu.name);
    formData.append("description", menu.description);
    formData.append("price", Number(menu.price));
    formData.append("image", image);

    await partnerStore.updateMenu(id, formData);
    history.push(`/partner/menu/${partnerId} `);
  };

  const onChangeMenu = (event) => {
    const { name, value } = event.target;
    setMenu((prevMenu) => {
      return {
        ...prevMenu,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <div className="mt-3 md:mt-0 md:col-span-2">
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-1 mb-3">
          แก้ไขข้อมูลเมนูอาหาร
        </h3>
        <form onSubmit={updateMenu} encType="multipart/form-data">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ชื่อเมนูอาหาร
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={menu.name}
                    onChange={onChangeMenu}
                    autoComplete="name"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    คำอธิบายเมนูอาหาร
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    value={menu.description}
                    onChange={onChangeMenu}
                    autoComplete="description"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ราคา
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={menu.price}
                    onChange={onChangeMenu}
                    autoComplete="price"
                    className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm lg:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    {" "}
                    รูปภาพร้านอาหาร{" "}
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div>
                        {imageChange == true ? (
                          <img
                            src={preview}
                            className="mx-auto  h-48 w-96 text-gray-400 rounded-md"
                          />
                        ) : (
                          <img
                            src={`http://localhost:5500/uploads/${image}`}
                            className="mx-auto  h-48 w-96 text-gray-400 rounded-md"
                          />
                        )}
                      </div>

                      {!image && (
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}

                      <div className=" text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-[#1890ff] hover:text-[#40a9ff] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>อัพโหลดรูปภาพ</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            filename="image"
                            className="sr-only"
                            onChange={showPreview}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="group relative  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#1890ff] hover:bg-[#40a9ff] "
              >
                บันทึกข้อมูล
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default EditMenu;
