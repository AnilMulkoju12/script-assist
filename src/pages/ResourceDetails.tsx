import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container, Title, Card, Text, Loader } from "@mantine/core";

interface Launch {
  name: string;
  date_utc: string;
  rocket: string;
  success: boolean | null;
  details: string | null;
}

const fetchLaunch = async (id: string): Promise<Launch> => {
  const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch launch details");
  }
  return res.json();
};

const ResourceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<Launch, Error>({
    queryKey: ["launch", id],
    queryFn: () => fetchLaunch(id!),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </div>
    );

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <Title order={2} mb="md" style={{ color: "#1e40af" }}>
        {data?.name}
      </Title>
      <Card
        shadow="lg"
        padding="lg"
        sx={{
          backgroundColor: "#f9fafb",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Text style={{ padding: "8px 16px" }}>
          <strong>Launch Date:</strong>{" "}
          {new Date(data.date_utc).toLocaleString()}
        </Text>
        <Text style={{ padding: "8px 16px" }}>
          <strong>Rocket:</strong> {data.rocket}
        </Text>
        <Text style={{ padding: "8px 16px" }}>
          <strong>Success:</strong> {data.success ? "Yes" : "No"}
        </Text>
        <Text style={{ padding: "8px 16px" }}>
          <strong>Details:</strong> {data.details || "No details available"}
        </Text>
      </Card>
    </Container>
  );
};

export default ResourceDetails;
