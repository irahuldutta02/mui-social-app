import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ErrorPage from "../../ErrorPage";
import fetchUser from "../../helpers/fetchUser";

const StyledCard = styled(Card)({
  maxWidth: 300,
  margin: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const StyledAvatar = styled(Avatar)({
  width: 100,
  height: 100,
  margin: "auto",
});

const StyledCardContent = styled(CardContent)({
  textAlign: "center",
});

export function UserCard() {
  let { id } = useParams();
  const response = useQuery(["user", id], fetchUser);

  if (response.isError) {
    return <ErrorPage error={"No such user found"} />;
  }
  if (response.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (response.isSuccess) {
    const user = response.data.data;
    return (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <StyledCard>
            <StyledAvatar
              alt={`${user.title} ${user.firstName} ${user.lastName}`}
              src={user.picture}
            />
            <StyledCardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{ textTransform: "capitalize" }}
              >
                {`${user.title} ${user.firstName} ${user.lastName}`}
              </Typography>
              <Typography color="text.secondary">{user.email}</Typography>
              <Typography color="text.secondary">{user.phone}</Typography>
              <Typography color="text.secondary">{`Gender: ${user.gender}`}</Typography>
              <Typography color="text.secondary">{`Date of Birth: ${new Date(
                user.dateOfBirth
              ).toLocaleDateString()}`}</Typography>
              <Typography color="text.secondary">{`Location: ${user.location.street}, ${user.location.city}, ${user.location.state}, ${user.location.country}`}</Typography>
              <Typography color="text.secondary">{`Registered on: ${new Date(
                user.registerDate
              ).toLocaleDateString()}`}</Typography>
              <Typography color="text.secondary">{`Last updated on: ${new Date(
                user.updatedDate
              ).toLocaleDateString()}`}</Typography>
            </StyledCardContent>
          </StyledCard>
        </Box>
      </>
    );
  }
}
