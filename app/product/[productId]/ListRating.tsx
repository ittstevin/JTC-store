'use client';

import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";

interface ListRatingProps{
    product: any;
}

const ListRating:React.FC<ListRatingProps> = ({product}) => {
    return ( 
        <div>
            <Heading title="Product Review"/>
            <div className="text-sm mt-2">
                {product.reviews && product.reviews.map((Review: any) => {
                    return(
                        <div key={Review.id} className="max-w-300px">
                            <div className="flex gap-2 items-center">
                                <Avatar src={Review.user.image}/>
                                <div className="font-semibold">{Review?.user.name}</div>
                                <div className="font-light">{moment(Review.createdDate).fromNow()}</div>
                            </div>
                            <div className="mt-2">
                                <Rating value={Review.rating} readOnly/>
                                <div className="ml-2">{Review.comment}</div>
                                <hr className="mt-4 mb-4"/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default ListRating;