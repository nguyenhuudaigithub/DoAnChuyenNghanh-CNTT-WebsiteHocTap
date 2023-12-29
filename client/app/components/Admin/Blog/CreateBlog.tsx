import React, { useEffect, useState } from "react";
import { styles } from "../../styles/style";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box, Modal } from "@mui/material";
import Switch from "react-switch";
import { useCreateBlogMutation } from "@/redux/features/blog/blogApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1600,
  height: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateBlog = (props: Props) => {
  const [blogInfo, setBlogInfo] = useState({
    title: "",
    tags: "",
    description: "",
    thumbnail: "",
    detail: "",
    display: false,
  });

  const handleSubmit = async () => {
    const data = {
      title: blogInfo.title,
      description: blogInfo.description,
      tags: blogInfo.tags,
      thumbnail: blogInfo.thumbnail,
      detail: blogInfo.detail,
      display: blogInfo.display,
    };

    setBlogInfo(data);
  };
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setBlogInfo({ ...blogInfo, thumbnail: e.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setBlogInfo({ ...blogInfo, thumbnail: e.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setBlogInfo({ ...blogInfo, detail: data });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
    setBlogInfo({ ...blogInfo, display: !checked });
  };
  const [createBlog, { isLoading, isSuccess, error }] = useCreateBlogMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Bài viết được tạo thành công!");
      redirect("/admin/blogs");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
      }
    }
  }, [isLoading, isSuccess, error]);

  const handleBlogCreate = async (e: any) => {
    const data = blogInfo;
    if (!isLoading) {
      await createBlog(data);
    }
  };

  return (
    <>
      <div className="w-[80%] m-auto mt-24">
        <form onSubmit={handleSubmit} className={`${styles.label}`}>
          <div id="editor"></div>
          <div>
            <label htmlFor="">Tiêu đề bài viết</label>
            <input
              type="name"
              name=""
              required
              value={blogInfo.title}
              onChange={(e: any) =>
                setBlogInfo({ ...blogInfo, title: e.target.value })
              }
              id="name"
              placeholder="Tên Khóa Học"
              className={`${styles.input}`}
            />
          </div>
          <br />
          <div className="w-full flex justify-between">
            <div className="w-full">
              <label className={`${styles.label}`} htmlFor="email">
                Thẻ Khóa
              </label>
              <input
                type="text"
                name=""
                required
                value={blogInfo.tags}
                onChange={(e: any) =>
                  setBlogInfo({ ...blogInfo, tags: e.target.value })
                }
                id="tags"
                placeholder="Tin lập trình, thông báo, ngôn ngữ,..."
                className={`${styles.input}`}
              />
            </div>
          </div>
          <br />

          <div className="w-full flex justify-between">
            <div className="w-[45%]">
              <label className={`${styles.label}`} htmlFor="email">
                Mô tả
              </label>
              <input
                type="text"
                name=""
                required
                value={blogInfo.description}
                onChange={(e: any) =>
                  setBlogInfo({ ...blogInfo, description: e.target.value })
                }
                id="tags"
                placeholder="Mô tả ngắn gọn nội dung..."
                className={`${styles.input}`}
              />
            </div>
            <div className="w-[45%]">
              <label className={`${styles.label}`} htmlFor="email">
                Trạng thái
              </label>
              <div className="mt-4">
                <Switch checked={checked} onChange={handleChange} />
              </div>
            </div>
          </div>
          <br />

          <div className="w-full text-black">
            <label className={`${styles.label}`} htmlFor="email">
              Chi Tiết
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={blogInfo.detail}
              onChange={handleEditorChange}
              onReady={(e: any) => {
                e.editing.view.change((w: any) => {
                  w.setStyle(
                    "height",
                    "500px",
                    e.editing.view.document.getRoot()
                  );
                });
              }}
            />
          </div>
          <br />

          <div className="w-full">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="file"
              className="hidden"
            />
            <label
              htmlFor="file"
              className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                dragging ? "bg-blue-500" : "bg-transparent"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {blogInfo.thumbnail ? (
                <img
                  src={blogInfo.thumbnail}
                  alt=""
                  className="max-h-full w-full object-cover"
                />
              ) : (
                <span className="text-black dark:text-white">
                  Kéo và thả hình thu nhỏ của bạn vào đây hoặc nhấp để duyệt
                </span>
              )}
            </label>
          </div>
          <br />
          <div className="w-full flex items-center justify-center">
            <input
              type="button"
              onClick={handleBlogCreate}
              value="Đăng bài"
              className="w-full m-3 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
            />
            <input
              type="button"
              onClick={handleOpen}
              value="Xem Trước"
              className="w-full m-3 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
            />
          </div>
          <br />
          <br />
        </form>
        {
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={style}
              className="bg-white dark:bg-slate-900 dark:text-white text-black overflow-y-auto"
            >
              <div className="w-full flex justify-between">
                <div className="w-[70%]">
                  <h1
                    style={{ fontSize: "24px", fontWeight: "bold" }}
                    className="mb-3"
                  >
                    {blogInfo.title}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: blogInfo.detail }}
                    style={{ maxHeight: "780px", overflowY: "auto" }}
                  />
                </div>
                <div className="w-[28%]">
                  <div className="w-full mt-6">
                    <h1
                      style={{ fontSize: "24px", fontWeight: "bold" }}
                      className="mb-3"
                    >
                      Bài viết mới nhất
                    </h1>
                  </div>
                  <div className="flex w-full mb-3 dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
                    <div className="w-[40%]">
                      <img
                        src={blogInfo.thumbnail}
                        alt=""
                        className="max-h-full w-full object-cover"
                      />
                    </div>
                    <div className="w-[55%] ml-3">
                      <h5
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        className="mb-3"
                      >
                        {blogInfo.title}
                      </h5>
                      <p
                        style={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflowWrap: "break-word",
                        }}
                      >
                        {blogInfo.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full mb-3 dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
                    <div className="w-[40%]">
                      <img
                        src={blogInfo.thumbnail}
                        alt=""
                        className="max-h-full w-full object-cover"
                      />
                    </div>
                    <div className="w-[55%] ml-3">
                      <h5
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        className="mb-3"
                      >
                        {blogInfo.title}
                      </h5>
                      <p
                        style={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflowWrap: "break-word",
                        }}
                      >
                        {blogInfo.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full mb-3 dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
                    <div className="w-[40%]">
                      <img
                        src={blogInfo.thumbnail}
                        alt=""
                        className="max-h-full w-full object-cover"
                      />
                    </div>
                    <div className="w-[55%] ml-3">
                      <h5
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        className="mb-3"
                      >
                        {blogInfo.title}
                      </h5>
                      <p
                        style={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflowWrap: "break-word",
                        }}
                      >
                        {blogInfo.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full mb-3 dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
                    <div className="w-[40%]">
                      <img
                        src={blogInfo.thumbnail}
                        alt=""
                        className="max-h-full w-full object-cover"
                      />
                    </div>
                    <div className="w-[55%] ml-3">
                      <h5
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        className="mb-3"
                      >
                        {blogInfo.title}
                      </h5>
                      <p
                        style={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflowWrap: "break-word",
                        }}
                      >
                        {blogInfo.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
                    <div className="w-[40%]">
                      <img
                        src={blogInfo.thumbnail}
                        alt=""
                        className="max-h-full w-full object-cover"
                      />
                    </div>
                    <div className="w-[55%] ml-3">
                      <h5
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        className="mb-3"
                      >
                        {blogInfo.title}
                      </h5>
                      <p
                        style={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflowWrap: "break-word",
                        }}
                      >
                        {blogInfo.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        }
      </div>
    </>
  );
};

export default CreateBlog;
