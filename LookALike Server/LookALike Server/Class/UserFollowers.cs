namespace LookALike_Server.Class
{
    public class UserFollowers
    {
        string follower_Email; //מי שעוקב
        string following_Email; //אחרי מי עוקב
        static List<UserFollowers> UserFollowers_List = new List<UserFollowers>();

        public UserFollowers(string follower_Email, string following_Email)
        {
            Follower_Email = follower_Email;
            Following_Email = following_Email;
        }

        public UserFollowers() { }

        public string Follower_Email { get => follower_Email; set => follower_Email = value; }
        public string Following_Email { get => following_Email; set => following_Email = value; }

        public List<UserFollowers> ReadAllFollowers()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadAllFollowers();
        }

        public List<object> SearchUserFollowers(string email)
        {
            DBservices dbs = new DBservices();
            return dbs.SearchUserFollowers(email);
        }

        public int InsertNewFollower()
        {
            DBservices dbs = new DBservices();
            List<UserFollowers> allFollowers = ReadAllFollowers();
            List<User> AllUsers = new List<User>();
            AllUsers = dbs.ReadUsers();
            if (!AllUsers.Exists(user => user.Email == this.Follower_Email))
            {
                // המייל לא קיים בטבלת החברים, או שמדובר במשתמש עסקי
                return -1;
            }
            if (allFollowers.Exists(UserFollow => UserFollow.follower_Email == this.follower_Email && UserFollow.following_Email == this.following_Email)) 
            {
                //יש חבר כזה כבר בטבלה
                return 0;
            }
            return dbs.InsertNewFollower(this);
        }

        public int DeleteFriend(string AdminMail, string FriendMail)
        {
            DBservices dbs = new DBservices();
            return dbs.DeleteFriendFromData(AdminMail, FriendMail) ? 1 : 0;
        }

    }
}
