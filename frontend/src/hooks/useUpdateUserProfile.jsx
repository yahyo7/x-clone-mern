import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateUserProfile = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: updateProfile, isLoading: isUpdatingProfile } = useMutation({
		mutationFn: async (formData) => {
			try {
				const res = await fetch(`/api/users/update`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});

				if (!res.ok) {
					const data = await res.json();
					throw new Error(data.error || "Something went wrong");
				}

				return await res.json();
			} catch (error) {
				throw new Error(error.message || "An unexpected error occurred");
			}
		},
		onSuccess: async () => {
			toast.success("Profile updated successfully");

			try {
				await Promise.all([
					queryClient.invalidateQueries(["authUser"]),
					queryClient.invalidateQueries(["userProfile"]),
				]);
			} catch (error) {
				toast.error("Failed to refresh data");
			}
		},
		onError: (error) => {
			toast.error(error.message || "An error occurred");
		},
	});

	return { updateProfile, isUpdatingProfile };
};

export default useUpdateUserProfile;
