import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Container, Title, Loader, Tooltip } from "@mantine/core";
import { Link } from "react-router-dom";


interface Launch {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
}

const fetchLaunches = async (): Promise<Launch[]> => {
  const res = await fetch("https://api.spacexdata.com/v4/launches");
  if (!res.ok) {
    throw new Error("Failed to fetch launches");
  }
  return res.json();
};

const ResourceList: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<Launch[], Error>({
    queryKey: ["launches"],
    queryFn: fetchLaunches,
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
        SpaceX Launches
      </Title>
      <Table
        striped
        highlightOnHover
        sx={{
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            {["Name", "Launch Date", "Rocket"].map((heading) => (
              <th
                key={heading}
                style={{
                  padding: "12px 16px",
                  backgroundColor: "#1e40af",
                  color: "#fff",
                }}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((launch) => (
            <tr
              key={launch.id}
              style={{
                border: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor:
                  data.indexOf(launch) % 2 === 0 ? "#f9fafb" : "#ffffff",
              }}
            >
              <td style={{ padding: "12px 16px" }}>
                <Link
                  to={`/resources/${launch.id}`}
                  style={{ color: "#1e40af", textDecoration: "none" }}
                >
                  <Tooltip label={`Click to view details`}>
                    <span>{launch.name}</span>
                  </Tooltip>
                </Link>
              </td>
              <td style={{ padding: "12px 16px" }}>
                {new Date(launch.date_utc).toLocaleString()}
              </td>
              <td style={{ padding: "12px 16px" }}>{launch.rocket}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ResourceList;
