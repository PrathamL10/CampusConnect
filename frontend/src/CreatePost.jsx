import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./CreatePost.css";
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { TextField, Autocomplete, Switch, FormControlLabel } from '@mui/material';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [isDoubt, setIsDoubt] = useState(false);
    const [communityList, setCommunityList] = useState([]);
    const [selectedCommunity, setSelectedCommunity] = useState(null);

    useEffect(() => {
        // Fetch community list when the component mounts
        const fetchCommunityList = async () => {
            try {
                const response = await fetch('https://campusconnectbackend.onrender.com/api/v1/auth/getUserMemberCommunity', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other headers your backend requires
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch community list');
                }

                const data = await response.json();
                setCommunityList(data);
            } catch (error) {
                console.error('Error fetching community list:', error);
            }
        };

        fetchCommunityList();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Access quillDelta directly, no need to parse JSON
            // console.log(content);
            // const quillDelta = content;
            // const text = quillDelta
            //     .getContents()
            //     .ops.map((op) => op.insert).join('');
            // const images = quillDelta
            //     .getContents()
            //     .ops.filter((op) => op.insert && op.insert.image)
            //     .map((op) => op.insert.image);

            // Define the base API endpoint
            const baseEndpoint = 'https://campusconnectbackend.onrender.com/api/v1/';

            // Define the endpoint based on isDoubt
            const endpoint = isDoubt ? 'doubt/create' : 'post/create';

            const response = await fetch(`${baseEndpoint}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers your backend requires
                },
                body: JSON.stringify({
                    content,
                    tags: tags.split(',').map(tag => tag.trim()), // Convert comma-separated tags to an array
                    community: selectedCommunity,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${isDoubt ? 'create doubt' : 'create post'}`);
            }

            // Optionally, handle the success response
            const responseData = await response.json();
            console.log(`${isDoubt ? 'Doubt' : 'Post'} created successfully:`, responseData);

            // Clear form fields after successful submission
            setContent('');
            setTags('');
            setSelectedCommunity(null);
        } catch (error) {
            console.error(`Error creating ${isDoubt ? 'doubt' : 'post'}:`, error);
        }
    };

    return (
        <div className='body2'>
            <div className='container3 body2  mt-4 ml-4'>
                <h2 className="text-2xl font-bold mb-6">Create a New Post</h2>
                <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-lg ">
                    <div className='mb-6'>
                        <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content</label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={(value) => setContent(value)}
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    ['link', 'image'],
                                    ['clean'],
                                ],
                            }}
                            formats={[
                                'header',
                                'bold', 'italic', 'underline', 'strike',
                                'list', 'bullet',
                                'link', 'image',
                            ]}
                            placeholder="Write your post..."
                            onChangeImage={(event) => console.log('Image added:', event)}
                            className="bg-gray-100 p-4 rounded"
                        />
                    </div>

                    <div className='mb-6'>
                        <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">Tags (comma-separated)</label>
                        <input
                            type="text"
                            id="tags"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder='Enter your tags'
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>

                    <div className='mb-6'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={communityList}
                            value={selectedCommunity}
                            onChange={(event, newValue) => setSelectedCommunity(newValue)}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Community" />}
                        />
                    </div>

                    <div className="mb-6 flex items-center">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isDoubt}
                                    onChange={() => setIsDoubt(!isDoubt)}
                                    color="primary"
                                />
                            }
                            label="Doubt"
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-700 hover:text-gray-100">Post</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;