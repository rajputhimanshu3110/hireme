import React, { useState } from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS, FONT, SIZES, icons, images } from '../constants';
import {
    ScreenHeaderBtn,
    Welcome,
    Nearbyjobs,
    Popularjobs
} from '../components'
const Home = () => {

    const router = useRouter();
    const [search, setSearch] = useState();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => {
                        return <ScreenHeaderBtn iconUrl={icons.menu} dimension={35} />
                    },
                    headerRight: () => {
                        return <ScreenHeaderBtn iconUrl={images.profile} dimension={40} />
                    },
                    headerTitle: ""
                }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Welcome
                        searchValue={search}
                        setSearchValue={setSearch}
                        handleClick={() => {
                            if (search) {
                                router.push(`/search/${search}`)
                            }
                        }}
                    />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home
