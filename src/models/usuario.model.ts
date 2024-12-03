
export interface Usuario {
    email:       string;
    id:          number;
    name:        string;
    permissions: Permission[];
    role:        string;
  }
  export interface Permission {
    create_perm: number;
    delete_perm: number;
    edit_perm:   number;
    menu:        Menu;
    view_perm:   number;
}
export interface Menu {
    icon:  string;
    id:    number;
    menu:  string;
    orden: number;
    padre: number;
    path:  string;
}

export interface PermissionNode extends Permission {
    children: PermissionNode[];
}