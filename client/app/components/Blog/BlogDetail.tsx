import {
  useAddAnswerInQuestionBlogMutation,
  useAddNewQuestionBlogMutation,
  useGetSingleBlogQuery,
} from "@/redux/features/blog/blogApi";
import React, { FC, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { styles } from "../styles/style";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
import Image from "next/image";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  id: any;
  user: any;
};

const BlogDetail: FC<Props> = ({ id, user }) => {
  const { data, isLoading, refetch } = useGetSingleBlogQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [question, setQuestion] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [
    addNewQuestionBlog,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionBlogMutation();

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Câu hỏi không thể trống rỗng!");
    } else {
      addNewQuestionBlog({
        question,
        blogId: id,
      });
    }
  };
  const [answer, setAnswer] = useState("");
  const [
    addAnswerInQuestionBlog,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionBlogMutation();
  const handleAnswerSubmit = () => {
    // console.log(answer)
    // console.log(id)
    // console.log(questionId)

    addAnswerInQuestionBlog({
      answer,
      blogId: id,
      questionId: questionId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Thêm câu hỏi thành công.");
      socketId.emit("notification", {
        title: "Câu hỏi mới từ bài viết",
        message: `Bạn có câu hỏi từ bài viết ${data.title}`,
        userId: user._id,
      });
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Thêm câu trả lời thành công.");
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: "Bạn có một câu trả lời mới.",
          message: `Bạn có một câu trả lời mới trong bài viết "${data.title}"`,
          userId: user._id,
        });
      }
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = error as any;
        toast.error(errorMessage?.data.message);
        refetch();
      }
    }
  }, [isSuccess, error, answerError, answerSuccess]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="max-w-screen-xl mx-auto px-5 dark:text-white text-black">
            <div className="mx-auto max-w-3xl mt-14">
              <span className="text-blue-400 uppercase tracking-wider text-sm font-medium">
                {data.blog.tags}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-1 lg:leading-tight">
                {data.blog.title}
              </h1>
              <div className="flex gap-2 mt-3 items-center flex-wrap md:flex-nowrap">
                <time className="text-gray-400 text-[14px]">
                  {new Date(data.blog?.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </time>
                <span className="text-gray-400 hidden md:block">•</span>
                <div className="w-full md:w-auto flex flex-wrap gap-3">
                  <span className="text-sm text-gray-500">#webdev</span>
                  <span className="text-sm text-gray-500">#tailwindcss</span>
                  <span className="text-sm text-gray-500">#frontend</span>
                </div>
              </div>
              <div className="mx-auto prose prose-lg mt-6 max-w-3xl overflow-y-auto">
                <div
                  dangerouslySetInnerHTML={{ __html: data.blog?.detail }}
                  style={{ fontSize: "16px" }}
                />
              </div>
            </div>
            <div className="text-center mt-8">
              {open == false ? (
                <>
                  <input
                    type="button"
                    onClick={handleOpen}
                    value="Đọc Bình Luận"
                    className="dark:bg-[#68adedc3] bg-[#f7f7f79c] px-5 py-3 rounded-md hover:bg-[#b0f5b391] transition mb-6"
                  />
                </>
              ) : (
                <>
                  <input
                    type="button"
                    onClick={handleClose}
                    value="Ẩn Bình Luận"
                    className="dark:bg-[#68adedc3] bg-[#f7f7f79c] px-5 py-3 rounded-md hover:bg-[#b0f5b391] transition mb-6"
                  />
                </>
              )}

              {open && (
                <>
                  <>
                    <div className="flex w-full">
                      <img
                        src={
                          user?.avatar
                            ? user.avatar.url
                            : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                        }
                        width={50}
                        height={50}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full object-cover"
                      />
                      <textarea
                        name=""
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        id=""
                        cols={40}
                        rows={5}
                        placeholder="Viết câu hỏi của bạn..."
                        className="outline-none bg-transparent ml-3 border dark:border-[#ffffff57] border-black 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                      />
                    </div>
                    <div className={`w-full flex justify-end`}>
                      <div
                        className={`${
                          styles.button
                        } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                          questionCreationLoading && "cursor-not-allowed"
                        }`}
                        onClick={
                          questionCreationLoading ? () => {} : handleQuestion
                        }
                      >
                        Lưu
                      </div>
                    </div>
                    <br />
                    <br />
                    <div className="w-full h-[1px] dark:bg-[#ffffff3b] bg-black"></div>
                    <div>
                      <CommentReply
                        data={data}
                        answer={answer}
                        setAnswer={setAnswer}
                        handleAnswerSubmit={handleAnswerSubmit}
                        // user={user}
                        setQuestionId={setQuestionId}
                        answerCreationLoading={answerCreationLoading}
                      />
                    </div>
                  </>
                </>
              )}
            </div>
            <div className="text-center mt-8">
              <a
                href="/blog"
                className="dark:bg-[#7e91a3c3] bg-[#f7f7f79c] px-5 py-3 rounded-md hover:bg-[#b0f5b391] transition"
              >
                ← Quay Lại
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const CommentReply = ({
  data,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
  setQuestionId,
}: any) => {
      // console.log(data)
      // console.log("answer",answer)
      // console.log("setAnswer",setAnswer)
      // console.log("handleAnswerSubmit",handleAnswerSubmit)
      // console.log("answerCreationLoading",answerCreationLoading)
      // console.log("setQuestionId",setQuestionId)
  return (
    <div className="w-full my-3">
      {data?.blog?.questions.map((item: any, index: any) => (
        <CommentItem
          key={index}
          data={data}
          item={item}
          index={index}
          setAnswer={setAnswer}
          answer={answer}
          setQuestionId={setQuestionId}
          answerCreationLoading={answerCreationLoading}
          handleAnswerSubmit={handleAnswerSubmit}
        />
      ))}
    </div>
  );
};

const CommentItem = ({
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  // console.log(setQuestionId)
  // console.log(item)
  // console.log(answer)
  // console.log(setAnswer)
  // console.log(handleAnswerSubmit)
  // console.log(answerCreationLoading)
  const [replyActive, setreplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <Image
            src={
              item.user?.avatar
                ? item.user.avatar.url
                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
            }
            width={50}
            height={50}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="pl-3  dark:text-white text-black font-[600]">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p className="flex justify-start">{item?.question}</p>
            <small className="flex justify-start dark:text-[#ffffff83] text-black">
              {!item.createdAt ? "" : format(item?.createdAt)} •
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setreplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "Tất cả"
                : "Trả lời"
              : "Ẩn"}
          </span>
          <BiMessage
            size={20}
            className="dark:text-[#ffffff83] cursor-pointer text-[#000000b8]"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>
      </div>

      {replyActive && (
        <>
          {item.questionReplies.map((item: any) => (
            <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
              <div>
                <Image
                  src={
                    item.user?.avatar
                      ? item.user?.avatar.url
                      : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                  }
                  width={50}
                  height={50}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
              </div>
              <div className="pl-3">
                <div className="flex items-center">
                  <h5 className="text-[20px]">{item.user.name}</h5>
                  {item.user.role === "admin" && (
                    <VscVerifiedFilled className="text-[#50c750] ml-2 text-[20px]" />
                  )}
                </div>
                <p className="flex justify-start">{item.answer}</p>
                <small className="flex justify-start text-[#ffffff83]">
                  {format(item.createdAt)}
                </small>
              </div>
            </div>
          ))}
          <>
            <div className="w-full flex relative dark:text-white text-black">
              <input
                type="text"
                placeholder="Nhập câu trả lời của bạn..."
                value={answer}
                onChange={(e: any) => setAnswer(e.target.value)}
                className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] p-[5px] w-[95%] ${
                  answer === "" ||
                  (answerCreationLoading && "cursor-not-allowed")
                }`}
              />
              <button
                type="submit"
                className="absolute right-0 bottom-1"
                onClick={handleAnswerSubmit}
                disabled={answer === "" || answerCreationLoading}
              >
                Lưu
              </button>
            </div>
            <br />
          </>
        </>
      )}
    </>
  );
};

export default BlogDetail;
