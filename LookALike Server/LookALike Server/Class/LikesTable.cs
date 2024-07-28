namespace LookALike_Server.Class
{
    public class LikesTable
    {
        string adminUserMail;
        string closetUserMail;
        int itemId;

        public LikesTable(string adminUserMail, string closetUserMail, int itemId)
        {
            AdminUserMail = adminUserMail;
            ClosetUserMail = closetUserMail;
            ItemId = itemId;
        }

        public LikesTable() { }

        public string AdminUserMail { get => adminUserMail; set => adminUserMail = value; }
        public string ClosetUserMail { get => closetUserMail; set => closetUserMail = value; }
        public int ItemId { get => itemId; set => itemId = value; }


        public int InsertlikeToLikesTable(string Liker_Email, string Liked_Email, int Item_ID)
        {
            DBservices dbs = new DBservices();
            return dbs.InsertlikeToLikesTable(Liker_Email, Liked_Email, Item_ID);
        }

        public List<object> GetAllItemsByUserClosetWithLikes(string AdminUserMail,string ClosetOwnerMail)
        {
            DBservices dbs = new DBservices();
            return dbs.GetAllItemsByUserClosetWithLikesDB(AdminUserMail,ClosetOwnerMail);
        }

        public List<object> GetLikedItemsForHomePage(string AdminUserMail)
        {
            DBservices dbs = new DBservices();
            return dbs.GetLikedItemsForHomePageDB(AdminUserMail);
        }
           
    }
}
