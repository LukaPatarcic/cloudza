import Section from '@element/Section/Section';
import SectionAlternate from '@element/Section/SectionAlternate';
import Future from '@module/HomeElements/Future/Future';
import Hero from '@module/HomeElements/Hero/Hero';
import Hub from '@module/HomeElements/Hub/Hub';
import Partners from '@module/HomeElements/Partners/Partners';
import Pricing from '@module/HomeElements/Pricing/Pricing';
import { colors, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
    },
    pagePaddingTop: {
        paddingTop: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(5),
        },
    },
    sectionNoPaddingTop: {
        paddingTop: 0,
    },
    shape: {
        borderBottomRightRadius: '50%',
        borderBottom: `1px solid ${colors.grey[200]}`,
    },
}));

const HomePage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.shape}>
                <Section className={classes.pagePaddingTop}>
                    <Hero />
                </Section>
                <Section className={classes.sectionNoPaddingTop}>
                    <Hub />
                </Section>
            </div>
            <SectionAlternate>
                <Partners />
            </SectionAlternate>
            <Section>
                <Future />
            </Section>
            <Divider />
            <SectionAlternate innerNarrowed>
                <Pricing />
            </SectionAlternate>
            <Divider />
        </div>
    );
};

export default HomePage;
