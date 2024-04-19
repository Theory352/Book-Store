import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Sinpper from "../components/Sinpper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { equeueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5000/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book created Successfully..", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        enqueueSnackbar("Error..", { variant: "error" });

        console.log(err);
      });
  };

  return (
    <div className=" p-4">
      <BackButton />
      <h1 className=" text-3xl my-4">Create Book</h1>
      {loading ? (
        <Sinpper />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4 ">
            <label className=" text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              value={title}
              className=" border-2 border-gray-500 px-4 py-2 w-full"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="my-4 ">
            <label className=" text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              value={author}
              className=" border-2 border-gray-500 px-4 py-2 w-full"
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
          </div>

          <div className="my-4 ">
            <label className=" text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="text"
              value={publishYear}
              className=" border-2 border-gray-500 px-4 py-2 w-full"
              onChange={(e) => {
                setPublishYear(e.target.value);
              }}
            />
          </div>

          <div
            className="p-2 bg-sky-300 m-8 text-center"
            onClick={handleSaveBook}
          >
            Save
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBooks;
