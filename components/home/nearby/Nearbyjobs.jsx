import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import useFetch from "../../../hooks/useFetch";
import { COLORS } from "../../../constants";
import styles from "./nearbyjobs.style";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { router } from "expo-router";

const Nearbyjobs = () => {
  const { data, isLoading, error } = useFetch("search", {
    query: "Software",
    num_pages: 1,
    radius: 10,
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          data?.map((job) => {
            return (
              <NearbyJobCard
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
