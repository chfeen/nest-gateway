export class User {
  private id: number;
  private name: string;
  private email: string;
  private password: string;
  private created_at: Date;
  private updated_at: Date;
  private deleted_at: Date;
  private is_deleted: boolean;
  private is_active: boolean;
  private is_admin: boolean;
  private is_verified: boolean;
  private is_blocked: boolean;
}
