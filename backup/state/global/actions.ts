import { createAction } from "@reduxjs/toolkit";

export const updateDarkMode = createAction<{ darkMode: boolean }>("global/updateDarkMode");