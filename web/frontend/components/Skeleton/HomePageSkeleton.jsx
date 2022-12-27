import {
    SkeletonPage,
    Layout,
    Card,
    SkeletonBodyText,
    TextContainer,
    SkeletonDisplayText,
    SkeletonTabs,
    Spinner,
} from '@shopify/polaris';
import React from 'react';
import styled from 'styled-components'

const SpinnerWrapper = styled.div`
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function HomePageSkeleton() {
    return (
        <SkeletonPage >
            <Layout>
                <Layout.Section >
                    <Card>
                        <Card.Section>
                            <SkeletonTabs />
                        </Card.Section>
                        <Card.Section>
                            <SpinnerWrapper>
                                <Spinner />
                            </SpinnerWrapper>
                        </Card.Section>
                    </Card>
                </Layout.Section>
            </Layout>
        </SkeletonPage>
    );
}