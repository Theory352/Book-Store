import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Sinpper from "../components/Sinpper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("An error happen. Please Check..");
        console.log(err);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book edited Successfully..", { variant: "success" });

        navigate("/");
      })
      .catch((err) => {
        enqueueSnackbar("Error.", { variant: "error" });

        console.log(err);
      });
  };

  return (
    <div className=" p-4">
      <BackButton />
      <h1 className=" text-3xl my-4">Edit Book</h1>
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
            onClick={handleEditBook}
          >
            Save
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBook;
