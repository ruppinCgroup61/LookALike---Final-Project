namespace LookALike_Server.Class
{
    public class PopUp
    {
        int popUpId;
        string userMail;
        DateTime startDate;
        DateTime endDate;
        bool status;
        static List<PopUp> AllPopUps = new List<PopUp>();

        public PopUp(int popUpId, string userMail, DateTime startDate, DateTime endDate, bool status)
        {
            PopUpId = popUpId;
            UserMail = userMail;
            StartDate = startDate;
            EndDate = endDate;
            Status = status;
        }

        public PopUp() { }

        public int PopUpId { get => popUpId; set => popUpId = value; }
        public string UserMail { get => userMail; set => userMail = value; }
        public DateTime StartDate { get => startDate; set => startDate = value; }
        public DateTime EndDate { get => endDate; set => endDate = value; }
        public bool Status { get => status; set => status = value; }

        public int CreateNewPopUp()
        {
            DBservices dbs = new DBservices();
            return dbs.InsertNewPopUp(this);
        }

        public List<PopUp> ReadAllPopUps()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadAllPopUps();
        }

        public List<PopUp> ReadByEmail(string UserMail)
        {
            DBservices dbs = new DBservices();
            List<PopUp> EmailPopUpList = new List<PopUp>();
            EmailPopUpList = dbs.ReadPopUpsByEmail(UserMail);
            return EmailPopUpList;
        }
    }
}
