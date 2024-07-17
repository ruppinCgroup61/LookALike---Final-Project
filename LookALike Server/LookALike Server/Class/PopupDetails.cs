namespace LookALike_Server.Class
{
    public class PopupDetails
    {
        int id;
        string email;
        int itemId;

        public PopupDetails(int id, string email, int itemId)
        {
            Id = id;
            Email = email;
            ItemId = itemId;
        }

        public PopupDetails() { }

        public int Id { get => id; set => id = value; }
        public string Email { get => email; set => email = value; }
        public int ItemId { get => itemId; set => itemId = value; }

        //public bool Insert()
        //{
        //    DBservices dbs = new DBservices();
        //    dbs.InsertNewPopupDetails(this);
        //    return true;
        //}

        public List<object> ReadAllPopUpItems(string UserMail, int PopUpId)
        {
            DBservices dbs = new DBservices();
            List<object> PopUpItemsList = new List<object>();
            return PopUpItemsList = dbs.ReadAllPopUpItems(UserMail, PopUpId);
        }

        public bool InsertItemToPopUp(Item item, int popUpId, string userMail)
        {
            DBservices dbs = new DBservices();
            return dbs.InsertItemToPopUp(item, popUpId, userMail) > 0;
        }

    }
}
