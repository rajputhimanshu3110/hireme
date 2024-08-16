import React, { useCallback, useState } from 'react'
import { Text, View, ScrollView, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';

import { useRouter, Stack, useGlobalSearchParams } from 'expo-router';
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';

const tabs = ["About", "Qualifications", "Responsibilities"];


import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hooks/useFetch';




const displayTabContent = (activeTab, data) => {
    switch (activeTab) {
        case 'Qualifications':
            return <Specifics
                title="Qualifications"
                points={data ? data[0].job_highlights?.Qualifications : ['N/A']}
            />
        case "About":
            return <JobAbout
                info={data ? data[0].job_description : "No Data Provided"}
            />
        case "Responsibilities":
            return <Specifics
                title="Responsibilities"
                points={data ? data[0].job_highlights?.Responsibilities : ['N/A']}
            />
        default:
            break;
    }
}
const JobDetail = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    console.log(params);
    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    })
    const [refreshing, setRefresing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0])
    const onRefresh = useCallback(() => {
        setRefresing(true);
        refetch();
        setRefresing(false);
    })


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => {
                        return <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension={30}
                            handlePress={() => router.back()}

                        />
                    },
                    headerRight: () => {
                        return <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension={30}
                            handlePress={() => router.back()}

                        />
                    },
                    headerTitle: ""
                }}
            />
            <>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {isLoading ? (<ActivityIndicator size='large' color={COLORS.primary} />) : error ?
                        <Text>Something Went Wrong</Text> :
                        data?.length === 0 ? (<Text>No Data</Text>) :
                            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                                <Company
                                    companyLogo={data ? data[0].employer_logo : 'https://assets.zyrosite.com/YBgyMbnp7osy5l7j/ai-logo-YZ9X0jJ21yIbMqvJ.svg'}
                                    jobTitle={data ? data[0].job_title : ''}
                                    companyName={data ? data[0].employer_name : ''}
                                    Location={data ? data[0].job_country : ''}
                                />
                                <JobTabs
                                    tabs={tabs}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />
                                {displayTabContent(activeTab, data)}


                            </View>
                    }
                </ScrollView>
                <JobFooter url={data ? data[0].job_google_link : 'https://google.com'} />
            </>
        </SafeAreaView>
    )
}

export default JobDetail
