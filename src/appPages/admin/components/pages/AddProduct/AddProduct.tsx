import { FC, useState } from "react";
import scss from "./AddProduct.module.scss";
import { remove, edit, close } from "../icons";

interface AddProductProps {
  _id?: number
  image: string
}

const AddProduct: FC<AddProductProps> = () => {
  const [create, setCreate] = useState(false)
	const [edited, setEdited] = useState(false)
	const [product, setProduct] = useState(null)
  const [images, setImages] = useState<AddProductProps[]>([]);
	const [forDeleteImages, setForDeleteImages] = useState<AddProductProps[]>([])

	const [imageEditId, setImageEditId] = useState(0)


  
  const addNewImage = (e: any) => {
    const files = e.target.files[0]
    if (files) {
      const object = {
        imageLink: URL.createObjectURL(files),
        image: files,
        id: Date.now(),
      }
      setImages([...images, object])
    }
  }

  const deleteImage = (id: number) => {
    const deletedImage = images.filter((image) => image._id !== id)
    setImages(deletedImage)
  }

  const editImage = (e: any) => {
    const files = e.target.files[0]
    if (files) {
      const editedImage = images.map((el) => (el._id === imageEditId ? { ...el, image: files, imageLink: URL.createObjectURL(files) } : el))
      setImages(editedImage)
      setImageEditId(0)
    }
  }

  return (
    <section className={scss.AddProduct}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.Product_image}>
            <form action="">
              <h2>Фотографии продукта</h2>
              <div className={scss.images}>
              {images.map((el) => (
							<div key={el._id}>
								<button
									onClick={() => {
										deleteImage(el._id)
										if (edited) {
											setForDeleteImages([...forDeleteImages, el._id])
										}
									}}
									className="images__remove">
									{remove}
								</button>
								<label onClick={() => setImageEditId(el._id)} htmlFor="editInput" className="editInput">
									{edit}
								</label>
								<img src={el.image} alt="Image" />
							</div>
						))}
						<input onChange={(e) => editImage(e)} type="file" id="editInput" />
						<div className="images__block">
							<label htmlFor="addInput">{close}</label>
							<input onChange={(e) => addNewImage(e)} type="file" id="addInput" />
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
