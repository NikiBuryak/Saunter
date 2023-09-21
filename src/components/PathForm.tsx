import { Typography, Stack, TextField, Button, Box } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import CheckIcon from "@mui/icons-material/Check";
import { IForm } from "../models/IForm";
import { theme } from "../theme";
import MapIcon from "@mui/icons-material/Map";

type Props = {
  submitHandler: (data: IForm) => void;
  distance?: number;
};

export const PathForm = ({ submitHandler, distance }: Props) => {
  const { register, handleSubmit, formState } = useForm<IForm>({
    defaultValues: {
      title: "",
      shortDescr: "",
      fullDescr: "",
    },
  });

  const { errors } = formState;

  const onSubmit = (data: IForm) => {
    submitHandler(data);
  };
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextField
          label="Title"
          type="text"
          sx={{
            paddingBottom: theme.spacing(3),
          }}
          {...register("title", {
            required: "Field is required",
          })}
          error={!!errors.title}
          helperText={errors?.title?.message}
        />
        <TextField
          label="Short description"
          type="text"
          sx={{
            paddingBottom: theme.spacing(3),
          }}
          {...register("shortDescr", {
            maxLength: 160,
          })}
          error={!!errors.shortDescr}
          helperText="Max length 160 symbols"
        />
        <TextField
          label="Full description"
          type="text"
          multiline
          rows={3}
          sx={{
            paddingBottom: theme.spacing(3),
          }}
          {...register("fullDescr")}
        />
        {!!distance && (
          <Box
            sx={{
              padding: `${theme.spacing(6)} 0`,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MapIcon sx={{ marginRight: "5px" }} />
              Length {distance} km
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            variant="outlined"
            startIcon={<CheckIcon />}
            sx={{
              padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
            }}
          >
            Add Path
          </Button>
        </Box>
      </Stack>
    </form>
  );
};