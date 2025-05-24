import { useEffect, useState } from "react";
import { InputField } from "../../common/InputField";
import { Button } from "../../common/Button";
import { FaUser } from "react-icons/fa6";
import { MdDelete, MdModeEdit, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Pagination } from "../../common/Pagination";
import { IoMdSearch } from "react-icons/io";
import { getCategories } from "../../Commonapicall/Categoriesapicall/Categoriesapis";

interface Category {
  id: number;
  category: string;
  status: boolean;
  is_deleted: boolean;
}


interface CategoryApiResponse {
results:Category[]
}

export const CategoriesTable = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data =await getCategories() as CategoryApiResponse;
        setCategories(data.results); // adjust if API returns { results: [...] }
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Filter out deleted categories and filter by search term
  const filteredCategories = categories
    .filter((cat) => !cat.is_deleted)
    .filter((cat) =>
      cat.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      <div className="bg-white px-5 py-1 rounded-lg shadow-sm">
        {/* Header Section */}
        <div className="flex items-center justify-between pb-2 py-2">
          <div className="flex items-center">
            <span className="text-2xl font-bold">Categories</span>
            <span className="mx-2 pt-2 text-xl">
              <MdOutlineKeyboardArrowRight />
            </span>
            <span className="text-gray-500 pt-2 text-sm font-medium underline">
              Dashboard
            </span>
            <span className="mx-2 pt-2 text-sm">{"/"}</span>
            <span className="text-gray-500 pt-2 text-sm font-medium">
              Categories
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowAddPopup(true)}
              buttonType="button"
              buttonTitle="Add Category"
              icon={
                <div className="relative w-4 h-4">
                  <FaUser className="w-4 h-4 text-current" />
                  <span className="absolute -top-1.5 -left-2 text-current text-[15px] font-bold">
                    +
                  </span>
                </div>
              }
              className="flex items-center gap-2 bg-armsjobslightblue text-armsWhite border border-armsjobslightblue rounded px-4 py-2 font-bold hover:text-armsjobslightblue hover:bg-armsWhite transition-colors duration-200"
            />
            <div className="relative w-[300px]">
              <InputField
                type="text"
                placeholder="Search"
                className="w-full rounded-[5px] border-[1px] border-armsgrey pl-2 pr-2 py-1.5 focus-within:outline-none"
                label=""
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IoMdSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-armsgrey text-[18px]" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-main text-left">
              <tr className="text-armsWhite whitespace-nowrap">
                
                <th className="bg-main px-2 py-3">Category Name</th>
                <th className="bg-main px-2 py-3">Status</th>
                <th className="bg-main px-2 py-3 sticky right-0 z-10">Actions</th>
              </tr>
            </thead>
            <tbody className="whitespace-nowrap">
              {currentItems.map((category) => (
                <tr key={category.id} className="border-b-2 border-armsgrey">
                  <td className="px-2 py-2">{category.category}</td>
                  <td className="px-2 py-2">
                    {category.status ? "Active" : "Inactive"}
                  </td>
                  <td className="px-2 py-3 sticky right-0 z-10 bg-armsWhite border-b-2 border-armsgrey">
                    <div className="flex items-center space-x-2">
                      {/* Edit */}
                      <div
                        onClick={() => setShowEditPopup(true)}
                        className="relative flex items-center justify-center border border-armsjobslightblue rounded-full px-2 py-2 cursor-pointer group bg-armsjobslightblue hover:bg-white transition-all duration-200"
                      >
                        <MdModeEdit className="text-white group-hover:text-armsjobslightblue text-xl" />
                        <div className="absolute -top-6.5 bg-armsjobslightblue text-armsWhite text-xs font-semibold px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200">
                          Edit
                        </div>
                      </div>

                      {/* Delete */}
                      <div className="relative flex items-center justify-center border border-armsjobslightblue rounded-full px-2 py-2 cursor-pointer group bg-armsjobslightblue hover:bg-white transition-all duration-200">
                        <MdDelete className="text-white group-hover:text-armsjobslightblue text-xl" />
                        <div className="absolute -top-6.5 bg-armsjobslightblue text-armsWhite text-xs font-semibold px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-200">
                          Delete
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredCategories.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>

      {/* Placeholders for popups */}
      {showAddPopup && <div>Add Category Popup</div>}
      {showEditPopup && <div>Edit Category Popup</div>}
    </div>
  );
};
