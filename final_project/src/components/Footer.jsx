import { createStyles, Container, Group } from '@mantine/core';
import { BrandTelegram, BrandYoutube, BrandInstagram } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : "black"}`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.lg,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
    link: {
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: theme.shadows.sm,
        },
    }
}));

function FooterSocial() {
    const { classes } = useStyles();

    return (
        <div className={classes.footer}>
            <Container className='bg-white' fluid>
                <Container className={classes.inner} size="lg" px="0">
                    <img src="http://fmit.oshsu.kg/assets/img/fmit-logo-400n.png" alt="" width={80} />
                    <Group spacing={"xs"} className={classes.links} position="right" noWrap>
                        <BrandTelegram size={22} strokeWidth={2} className={`${classes.link} text-black/75 hover:text-black/100 ease-in duration-100`}/>
                        <BrandYoutube size={22} strokeWidth={2} className={`${classes.link} text-black/75 hover:text-black/100 ease-in duration-100`}/>
                        <BrandInstagram size={22} strokeWidth={2} className={`${classes.link} text-black/75 hover:text-black/100 ease-in duration-100`}/>
                    </Group>
                </Container>
            </Container>
        </div>
    );
}

export default FooterSocial