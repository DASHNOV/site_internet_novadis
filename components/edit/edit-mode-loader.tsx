"use client";

import dynamic from "next/dynamic";

// Le code d'édition n'est téléchargé qu'en mode édition : les pages publiques n'en référencent que ce chargeur.
export const EditModeLoader = dynamic(() => import("./edit-mode").then((m) => m.EditMode), { ssr: false });
