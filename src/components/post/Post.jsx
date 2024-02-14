import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Post = ({ post }) => {

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component='h2'>
                    {post.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Post ID: {post.id}
                </Typography>
                <Typography variant="body2" component='p'>
                    {post.content}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Post