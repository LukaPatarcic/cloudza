import * as React from 'react';
import { Dispatch, FC, SetStateAction } from 'react';

import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';

import Paper from '@element/Paper';
import { formatNumberFromCent } from '@helper/formatNumber';
import { IProduct } from '@type/api/product';

interface Props {
    products: IProduct[];
    setSelectedPrice: Dispatch<SetStateAction<string>>;
    selectedPrice: string;
}

const StripeProducts: FC<Props> = ({
    products,
    selectedPrice,
    setSelectedPrice,
}) => {
    return (
        <Paper sx={{ marginBottom: 2 }}>
            <Grid container spacing={2} justifyContent="center">
                {products.map(({ id, name, description, price }) => (
                    <Grid item xs={12} md={4} key={id}>
                        <Card
                            sx={
                                selectedPrice === price.id
                                    ? {
                                          border: (theme) =>
                                              `2px solid ${theme.palette.primary.main}`,
                                      }
                                    : {}
                            }
                        >
                            <CardActionArea
                                onClick={() => setSelectedPrice(price.id)}
                            >
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {name}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                    >
                                        {formatNumberFromCent(price.unitAmount)}{' '}
                                        € Per Request
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default StripeProducts;
