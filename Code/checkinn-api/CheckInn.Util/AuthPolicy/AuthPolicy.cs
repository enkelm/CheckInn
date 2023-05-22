namespace CheckInn.Util.AuthPolicy;

public static class AuthPolicy
{
    public const string SuperAdminOnly = "SuperAdminOnly";
    public const string AdminsOnly = "AdminsOnly";
    public const string ManagerAndAbove = "ManagerAndAbove";
    public const string ClientsAndAbove = "ClientsAndAbove";
    public const string GuestsAndAbove = "GuestsAndAbove";
}