import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";
import {
  Banner,
  Card,
  EmptyState,
  Icon,
  Layout,
  Page,
  ResourceList,
  SkeletonBodyText,
  Tabs,
} from "@shopify/polaris";

import {
  LockMajor
} from '@shopify/polaris-icons';
import { useCallback, useState, useEffect } from "react";
import ResourceListWithFilter from "../components/ResourceListWithFilter";
import { useAuthenticatedFetch } from "../hooks";


export default function HomePage() {
  let fetchApi = useAuthenticatedFetch()
  const callApi = async () => {
    let res =  await fetchApi('/api/products/count', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json'
      }
    })

    let data = await res.json()

    console.log(data)
  }

  useEffect(() => {
    callApi()
  }, [])



  const navigate = useNavigate();
  const tabs = [
    {
      id: 1,
      query: "All",
      content: "All"
    },
    {
      id: 2,
      query: "Custom 1",
      content: "Custom 1"
    },
    {
      id: 3,
      query: "Custom 2",
      content: "Custom 2"
    },
  ]

  const [selected, setSelected] = useState(0)

  const handleTabChange = useCallback((tabIndex) => setSelected(tabIndex), [])

  const handleClickBanner = () => {
    console.log("ClickedBanner")
  }

  const LockIcon = () => <Icon source={LockMajor} color="base" />


  return (
    <Page
      title="My Shopify App"
      primaryAction={{ content: "Add page", onAction: () => navigate("/addpage") }}
    >
      <Layout>
        <Layout.Section>
          <Banner
            status="info"
            icon={LockIcon}
            title="Store access is restricted"
            action={{ content: "See store password", onAction: handleClickBanner }}
          >
            <p>While your online store is in development, only visitors with the password can access it.</p>

          </Banner>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <ResourceListWithFilter query={tabs[selected].query} />
            </Tabs>

          </Card>
        </Layout.Section>
      </Layout>


    </Page>
  );
}