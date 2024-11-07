import React, { useEffect, useState, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid2, Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { Star, StarOutline, StarHalf } from "@mui/icons-material";
import axios from 'axios';

// Define the structure of the product data using an interface
interface Rating {
    rate: number;
    count: number;
}

interface Product {
    id: number;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

const fetchData = async (page: number, limit: number): Promise<Product[]> => {
    const res = await axios.get("http://localhost:8000/api/v1/data/products", {
        params: { page, limit }
    });
    return res.data.data; // Ensure this returns the expected array of products
};

const Layout: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const scrollPositionRef = useRef<number>(0); // Save the scroll position

    // Fetch initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            setIsFetching(true);
            const initialData = await fetchData(page, 5);
            setProducts((prevData) => [...prevData, ...initialData]); // Append initial data
            setIsFetching(false);
        };

        fetchInitialData();
    }, []);

    // Infinite scroll handling
    const handleScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isFetching) {
            // Save scroll position before fetching new data
            scrollPositionRef.current = window.scrollY;
            setPage((prevPage) => prevPage + 1);
        }
    }, [isFetching]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Fetch additional data when `page` updates
    useEffect(() => {
        const fetchMoreData = async () => {
            if (page > 1) {
                setIsFetching(true);
                const newData = await fetchData(page, 5);
                setProducts((prevData) => [...prevData, ...newData]); // Append new data to the existing data
                setIsFetching(false);

                // Restore scroll position to prevent jumping to top
                window.scrollTo(0, scrollPositionRef.current);
            }
        };

        fetchMoreData();
    }, [page]);

    // If there’s no data initially and data is loading
    if (isFetching && products.length === 0) return <div>Loading initial data...</div>;

    return (
        <Box component={'section'} sx={{ background: "#edede9" }}>
            <Container maxWidth={'xl'} sx={{ padding: "5px 2px" }}>
                <Grid2 container spacing={3} gridAutoColumns={3}>
                    {products?.map((product) => (
                        <Grid2 size={{ xs: 12, md: 4, xl: 3 }} key={product.id}>
                            <Card sx={{ padding: "2px" }}>
                                <CardMedia sx={{ display: "flex", justifyContent: "center", padding: "10px 0" }}>
                                    <img src={product.image} alt={product.title} className='w-[200px]' />
                                </CardMedia>
                                <CardContent>
                                    <Typography variant='h6'>{product.title}</Typography>
                                    <p className='my-3'>{product.description}</p>
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography component={'span'} variant='body2' sx={{ color: "orange" }}>
                                            <Star /><Star /><Star /><StarHalf /><StarOutline />
                                        </Typography>
                                        <Typography component={'strong'}>${product.price}</Typography>
                                    </Box>
                                    <Button variant='contained' sx={{ background: "black", color: "white", display: "block", marginTop: 2 }}>
                                        Order Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
                {isFetching && <p>Loading more...</p>}
            </Container>
        </Box>
    );
};

export default Layout;
