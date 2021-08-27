import React, { useState } from 'react'
import ReviewsDetails from '../blog/BlogDetails_Fix';
export default function ReviewDetails() {
    const [value, setValue] = useState('');
    const [liked, setLiked] = useState(false);
    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const handleLike = () => {
        let newValue = liked;
        newValue = !newValue;
        setLiked(newValue);
    }

    return (
        <ReviewsDetails title="Reviews" />
    )
}
