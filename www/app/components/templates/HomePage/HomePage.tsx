import { colors, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Section from '@element/Section/Section';
import SectionAlternate from '@element/SectionAlternate/SectionAlternate';
import Customization from '@module/HomeElements/Customization/Customization';
import Hero from '@module/HomeElements/Hero/Hero';
import Hub from '@module/HomeElements/Hub/Hub';
import Partners from '@module/HomeElements/Partners/Partners';
import Pricing from '@module/HomeElements/Pricing/Pricing';

const integrations = [
    {
        logo: '/images/logos/slack.svg',
        name: 'Slack',
    },
    {
        logo: '/images/logos/mailchimp.svg',
        name: 'Mailchimp',
    },
    {
        logo: '/images/logos/dropbox.svg',
        name: 'Dropbox',
    },
    {
        logo: '/images/logos/google-drive.svg',
        name: 'Google Drive',
    },
    {
        logo: '/images/logos/google-ad-manager.svg',
        name: 'Google Ad Manager',
    },
    {
        logo: '/images/logos/atlassian.svg',
        name: 'Atlassian',
    },
];

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
        // background: theme.palette.background.default,
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
            <Section>
                <Partners data={integrations} />
            </Section>
            <SectionAlternate>
                <Customization />
            </SectionAlternate>
            <Divider />
            <SectionAlternate innerNarrowed>
                <Pricing />
            </SectionAlternate>
            <Divider />
        </div>
    );
};

export default HomePage;
