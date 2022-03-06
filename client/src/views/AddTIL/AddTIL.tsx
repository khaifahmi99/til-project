import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Navbar } from '../../components/Navbar';

const AddTIL = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      tags: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, 'Must be 100 characters or less')
        .required('Required'),
      content: Yup.string().required('Required'),
      tags: Yup.string().optional(),
    }),
    onSubmit: (values) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      };

      fetch('http://localhost:9090/doc', requestOptions)
        .then((response) => {
          console.log('res', response);
          return response.json();
        })
        .then(() => navigate('/'))
        .catch((e) => console.log(e));
    },
  });

  return (
    <>
      <Navbar />    
      <form className="my-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col w-3/4 mx-auto space-y-4">
          <div>
            <label className="flex text-lg" htmlFor="title">
              Title
            </label>
            <input
              className="w-full rounded border-2 border-gray-400 p-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
              required
            />
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>

          <div>
            <label className="flex text-lg" htmlFor="content">
              Content
            </label>
            <textarea
              className="w-full rounded border-2 border-gray-400 p-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              id="content"
              name="content"
              onChange={formik.handleChange}
              value={formik.values.content}
              rows={25}
              required
            />
            {formik.touched.content && formik.errors.content ? (
              <div>{formik.errors.content}</div>
            ) : null}
          </div>

          <div>
            <label className="flex text-lg" htmlFor="tags">
              Tags
            </label>
            <input
              className="w-full rounded border-2 border-gray-400 p-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              id="tags"
              name="tags"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.tags}
              placeholder="Separated by comma (eg. html,cloud computing,react.js)"
            />
          </div>

          <button
            type="submit"
            className="h-16 bg-sky-500 text-white text-lg border-none rounded w-48 mx-auto hover:cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddTIL;
