import React, { FC } from 'react';

import Link from 'next/link';

import StarIcon from '@mui/icons-material/StarBorder';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    Typography,
} from '@mui/material';

import { pricingList } from '@module/HomeElements/Pricing/pricingList';

const Pricing: FC = () => {
    return (
        <Grid container spacing={2} alignItems="flex-end">
            {pricingList?.map(
                ({
                    title,
                    subheader,
                    price,
                    buttonVariant,
                    buttonText,
                    href,
                    description,
                }) => (
                    <Grid item key={title} xs={12} sm={12} md={4}>
                        <Card>
                            <CardHeader
                                title={title}
                                subheader={subheader}
                                titleTypographyProps={{ align: 'center' }}
                                action={title === 'Pro' ? <StarIcon /> : null}
                                subheaderTypographyProps={{
                                    align: 'center',
                                }}
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? theme.palette.grey[200]
                                            : theme.palette.grey[700],
                                }}
                            />
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                        mb: 2,
                                    }}
                                >
                                    <Typography
                                        component="h2"
                                        variant="h3"
                                        color="text.primary"
                                    >
                                        €{price}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        /mo
                                    </Typography>
                                </Box>
                                <ul
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        listStyle: 'none',
                                    }}
                                >
                                    {description.map((line) => (
                                        <Typography
                                            component="li"
                                            variant="subtitle1"
                                            align="center"
                                            key={line}
                                        >
                                            {line}
                                        </Typography>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardActions>
                                <Link href={href} passHref>
                                    <Button
                                        fullWidth
                                        variant={
                                            buttonVariant as
                                                | 'outlined'
                                                | 'contained'
                                        }
                                    >
                                        {buttonText}
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                )
            )}
        </Grid>
    );
};

export default Pricing;
