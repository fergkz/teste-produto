import axios from "axios";
import { redirect } from "next/navigation";

export default function ProductDelete({ params }) {
  const { id } = params;

  if (id) {
    axios.delete(`${process.env.backendUrl}/product/${id}/delete`);
  }

  redirect("/product");
}
