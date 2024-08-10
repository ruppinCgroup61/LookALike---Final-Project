using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using LookALike_Server.Class;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;
using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc;
//using RuppinProj.Models;

/// <summary>
/// DBServices is a class created by me to provides some DataBase Services
/// </summary>
public class DBservices
{

    public DBservices()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    //--------------------------------------------------------------------------------------------------
    // This method creates a connection to the database according to the connectionString name in the web.config 
    //--------------------------------------------------------------------------------------------------
    public SqlConnection connect(String conString)
    {

        // read the connection string from the configuration file
        IConfigurationRoot configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json").Build();
        string cStr = configuration.GetConnectionString("myProjDB");
        SqlConnection con = new SqlConnection(cStr);
        con.Open();
        return con;
    }


    //--------------------------------------------------------------------------------------------------
    // This method Inserts a User to the Users table 
    //--------------------------------------------------------------------------------------------------
    public string Insert(User user)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // יצירת החיבור
        }
        catch (Exception ex)
        {
            // כתיבה ללוג
            throw (ex);
        }

        cmd = CreateUserInsertCommandWithStoredProcedure("sp_LAL_InsertUser", con, user);  // יצירת הפקודה

        try
        {
            // ביצוע הקריאה לפרוצדורה ושמירת התוצאה
            string result = (string)cmd.ExecuteScalar();

            return result;
        }
        catch (Exception ex)
        {
            // כתיבה ללוג
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                // סגירת החיבור לבסיס הנתונים
                con.Close();
            }
        }
    }


    //---------------------------------------------------------------------------------
    // Create the SqlCommand for Insert User using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateUserInsertCommandWithStoredProcedure(String spName, SqlConnection con, User user)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", user.Email);
        cmd.Parameters.AddWithValue("@First_name", user.FirstName);
        cmd.Parameters.AddWithValue("@Last_name", user.LastName);
        cmd.Parameters.AddWithValue("@Image", user.Image);
        cmd.Parameters.AddWithValue("@Phone_Number", user.PhoneNumber);
        cmd.Parameters.AddWithValue("@Date_of_Birth", user.DateOfBirth);
        cmd.Parameters.AddWithValue("@Password", user.Password);
        cmd.Parameters.AddWithValue("@Is_Business", user.IsBusiness);

        return cmd;
    }


    //--------------------------------------------------------------------------------------------------
    // This method reads Users from the database 
    //--------------------------------------------------------------------------------------------------
    public List<User> ReadUsers()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<User> UsersList = new List<User>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateUserCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadUsers", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                User u = new User();
                u.Email = dataReader["Email"].ToString();
                u.FirstName = dataReader["First_Name"].ToString();
                u.LastName = dataReader["Last_Name"].ToString();
                u.Image = dataReader["Image"].ToString();
                u.PhoneNumber = dataReader["Phone_Number"].ToString();
                // Retrieve Date_of_birth as DateTime
                DateTime dateOfBirth = (DateTime)dataReader["Date_of_Birth"];
                // Convert DateTime to DateOnly
                u.DateOfBirth = dateOfBirth;
                u.Password = dataReader["Password"].ToString();
                u.IsBusiness = Convert.ToBoolean(dataReader["Is_Business"]);
                UsersList.Add(u);
            }
            return UsersList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateUserCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 20;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Update User from the database 
    //--------------------------------------------------------------------------------------------------
    public int UpdateUser(User user)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = UpdateUserCommandWithStoredProcedureWithoutParameters("sp_LAL_UpdateUser", con, user);   // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for UpdateUser using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand UpdateUserCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con, User user)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", user.Email);
        cmd.Parameters.AddWithValue("@First_name", user.FirstName);
        cmd.Parameters.AddWithValue("@Last_name", user.LastName);
        cmd.Parameters.AddWithValue("@Image", user.Image);
        cmd.Parameters.AddWithValue("@Phone_Number", user.PhoneNumber);
        cmd.Parameters.AddWithValue("@Date_of_Birth", user.DateOfBirth);
        cmd.Parameters.AddWithValue("@Password", user.Password);
        cmd.Parameters.AddWithValue("@Is_Business", user.IsBusiness);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Users from the database 
    //--------------------------------------------------------------------------------------------------
    public string GetUserFullName(string email)
    {
        SqlConnection con;
        SqlCommand cmd;
        string userFullName = null;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateGetUserFullNameCommandWithStoredProcedure("sp_LAL_GetUserFullName", con, email);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            if (dataReader.Read())
            {
                userFullName = dataReader["FullName"].ToString();
            }

            return userFullName;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }


    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateGetUserFullNameCommandWithStoredProcedure(String spName, SqlConnection con, string email)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object
        cmd.CommandText = spName;          // set the stored procedure name
        cmd.CommandTimeout = 10;           // time to wait for the execution, default is 30 seconds
        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        // Add the input parameter for the stored procedure
        cmd.Parameters.AddWithValue("@Email", email);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Login into the app
    //--------------------------------------------------------------------------------------------------
    public User Login(string email, string password)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // יצירת החיבור
        }
        catch (Exception ex)
        {
            // כתיבה ללוג
            throw (ex);
        }

        cmd = CreateUserLoginCommandWithStoredProcedure("sp_LAL_LoginUser", con, email, password);  // יצירת הפקודה

        try
        {
            SqlDataReader reader = cmd.ExecuteReader(); // ביצוע הקריאה לפרוצדורה

            User user = null;
            if (reader.Read())
            {
                // אם נמצאה התאמה, יצירת אובייקט משתמש עם הפרטים
                user = new User
                {
                    Email = reader["Email"].ToString(),
                    FirstName = reader["First_Name"].ToString(),
                    LastName = reader["Last_Name"].ToString(),
                    Image = reader["Image"].ToString(),
                    PhoneNumber = reader["Phone_Number"].ToString(),
                    DateOfBirth = (DateTime)reader["Date_of_Birth"],
                    //Password = reader["Password"].ToString(),
                    IsBusiness = Convert.ToBoolean(reader["Is_Business"])
                };
            }

            return user; // החזרת האובייקט או null אם לא נמצא
        }
        catch (Exception ex)
        {
            // כתיבה ללוג
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                // סגירת החיבור לבסיס הנתונים
                con.Close();
            }
        }
    }


    //---------------------------------------------------------------------------------
    // Create the SqlCommand for Login User using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateUserLoginCommandWithStoredProcedure(String spName, SqlConnection con, string email, string password)
    {
        SqlCommand cmd = new SqlCommand(); // יצירת אובייקט הפקודה

        cmd.Connection = con;              // שיוך החיבור לפקודה

        cmd.CommandText = spName;          // ציון שם הפרוצדורה

        cmd.CommandTimeout = 10;           // זמן המתנה לביצוע

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // סוג הפקודה, פרוצדורה מאוחסנת

        // הוספת הפרמטרים
        cmd.Parameters.AddWithValue("@Email", email);
        cmd.Parameters.AddWithValue("@Password", password);

        return cmd;
    }


    //--------------------------------------------------------------------------------------------------
    // This method Inserts a Item to the Items table 
    //--------------------------------------------------------------------------------------------------
    public int Insert(Item item)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateItemInsertCommandWithStoredProcedure("sp_LAL_InsertItem", con, item);  // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for Insert Item using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateItemInsertCommandWithStoredProcedure(String spName, SqlConnection con, Item item)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Item_Code", item.Item_Code);
        cmd.Parameters.AddWithValue("@Name", item.Name);
        cmd.Parameters.AddWithValue("@Image", item.Image);
        cmd.Parameters.AddWithValue("@Color_Code", item.Color_Code);
        cmd.Parameters.AddWithValue("@Season", item.Season);
        cmd.Parameters.AddWithValue("@Size", item.Size);
        cmd.Parameters.AddWithValue("@Brand_ID", item.Brand_ID);
        cmd.Parameters.AddWithValue("@Price", item.Price);
        cmd.Parameters.AddWithValue("@Is_Favorite", item.Is_Favorite);
        cmd.Parameters.AddWithValue("@Status", item.Status);
        cmd.Parameters.AddWithValue("@Email", item.User_Email);
        cmd.Parameters.AddWithValue("@Clothing_Type_ID", item.ClothingType_ID);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Items from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Item> ReadItems()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<Item> ItemsList = new List<Item>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateItemsCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadItems", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Item i = new Item();
                string item_code_flag = dataReader["Item_Code"].ToString();
                i.Item_ID= Convert.ToInt32(dataReader["Item_ID"]);
                if(item_code_flag == "")
                {
                    i.Item_Code = 999;
                }
                else
                {
                    i.Item_Code = Convert.ToInt32(dataReader["Item_Code"]);
                }
                i.Name = dataReader["Name"].ToString();
                i.Image = dataReader["Image"].ToString();
                i.Color_Code = dataReader["Color_Code"].ToString();
                i.Season = dataReader["Season"].ToString();
                i.Size = dataReader["Size"].ToString();
                i.Brand_ID = Convert.ToInt32(dataReader["Brand_ID"]);
                i.Price = Convert.ToDouble(dataReader["Price"]);
                i.Is_Favorite = dataReader.GetBoolean(dataReader.GetOrdinal("Is_Favorite"));
                i.Status = dataReader["Status"].ToString();
                i.User_Email = dataReader["Email"].ToString();
                i.ClothingType_ID = Convert.ToInt32(dataReader["Clothing_Type_ID"]);

                ItemsList.Add(i);
            }
            return ItemsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the Read using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateItemsCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Items by User from the database 
    //--------------------------------------------------------------------------------------------------
    public List<object> GetAllItemsByUser(string email)
    {

        SqlConnection con;
        SqlCommand cmd;
        List<object> ItemsList = new List<object>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateReadItemsByUserCommandWithStoredProcedureWithoutParameters("sp_LAL_GetAllItemByUser", con,email);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                var itemInList = new
                {
                    Item_ID = Convert.ToInt32(dataReader["Item_ID"]),
                    Item_Code = dataReader["Item_Code"] != DBNull.Value ? Convert.ToInt32(dataReader["Item_Code"]) : -999,
                    Name = dataReader["Name"].ToString(),
                    Image = dataReader["Image"].ToString(),
                    ClothingType_ID = Convert.ToInt32(dataReader["Clothing_Type_ID"]),
                    Clothing_Type = dataReader["Clothing_Type"].ToString(),
                    Color_Code = dataReader["Color_Code"].ToString(),
                    Season = dataReader["Season"].ToString(),
                    Size = dataReader["Size"].ToString(),
                    Brand_ID = Convert.ToInt32(dataReader["Brand_ID"]),
                    Brand = dataReader["Brand"].ToString(),
                    Price = Convert.ToDouble(dataReader["Price"]),
                    Is_Favorite = dataReader.GetBoolean(dataReader.GetOrdinal("Is_Favorite")),
                    Status = dataReader["Status"].ToString(),
                    User_Email = dataReader["Email"].ToString()
                };
                ItemsList.Add(itemInList);
            }
            return ItemsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the Read using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateReadItemsByUserCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con,string email)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Email", email);


        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Update item from the database 
    //--------------------------------------------------------------------------------------------------
    public int UpdateItem(Item item)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = UpdateItemCommandWithStoredProcedureWithoutParameters("sp_LAL_EditItem", con, item);   // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for UpdateUser using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand UpdateItemCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con, Item item)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Item_Code", item.Item_Code);
        cmd.Parameters.AddWithValue("@Name", item.Name);
        cmd.Parameters.AddWithValue("@Image", item.Image);
        cmd.Parameters.AddWithValue("@Color_Code", item.Color_Code);
        cmd.Parameters.AddWithValue("@Item_ID", item.Item_ID);
        cmd.Parameters.AddWithValue("@Size", item.Size);
        cmd.Parameters.AddWithValue("@Brand_ID", item.Brand_ID);
        cmd.Parameters.AddWithValue("@Price", item.Price);
        cmd.Parameters.AddWithValue("@Season", item.Season);
        cmd.Parameters.AddWithValue("@Is_Favorite", item.Is_Favorite);
        cmd.Parameters.AddWithValue("@Status", item.Status);
        cmd.Parameters.AddWithValue("@Email", item.User_Email);
        cmd.Parameters.AddWithValue("@Clothing_Type_ID", item.ClothingType_ID);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method read all top items from the database 
    //--------------------------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------------------------
    // This method read the count of items
    //--------------------------------------------------------------------------------------------------
    public List<object> NumberOfItemsFunc(string email)
    {

        SqlConnection con;
        SqlCommand cmd;
        List<object> CountList = new List<object>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CountItemsByUserCommandWithStoredProcedureWithoutParameters("sp_LAL_CheckNumOfItems", con, email);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                var countPart = new
                {
                    Clothing_Part = dataReader["Clothing_Part"].ToString(),
                    CountItems = Convert.ToInt32(dataReader["CountItems"]),
                    
                };
                CountList.Add(countPart);
            }
            return CountList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the Read using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CountItemsByUserCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con, string email)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@UserMail", email);


        return cmd;
    }


    public List<Item> GetAllTop(string email)
    {
        SqlConnection con;
        SqlCommand cmd;
        List<Item> itemsList = new List<Item>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw ex;
        }

        cmd = CreateGetAllTopCommandWithStoredProcedureWithParameters("sp_LAL_GetTopItemsByUser", con, email); // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Item i = new Item();
                string item_code_flag = dataReader["Item_Code"].ToString();
                i.Item_ID = Convert.ToInt32(dataReader["Item_ID"]);
                if (item_code_flag == "")
                {
                    i.Item_Code = 999;
                }
                else
                {
                    i.Item_Code = Convert.ToInt32(dataReader["Item_Code"]);
                }
                i.Name = dataReader["Name"].ToString();
                i.Image = dataReader["Image"].ToString();
                i.Color_Code = dataReader["Color_Code"].ToString();
                i.Season = dataReader["Season"].ToString();
                i.Size = dataReader["Size"].ToString();
                i.Brand_ID = Convert.ToInt32(dataReader["Brand_ID"]);
                i.Price = Convert.ToDouble(dataReader["Price"]);
                i.Is_Favorite = dataReader.GetBoolean(dataReader.GetOrdinal("Is_Favorite"));
                i.Status = dataReader["Status"].ToString();
                i.User_Email = dataReader["Email"].ToString();
                i.ClothingType_ID = Convert.ToInt32(dataReader["Clothing_Type_ID"]);

                itemsList.Add(i);
            }
            return itemsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw ex;
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //---------------------------------------------------------------------------------
    // Create the command with stored procedure and parameters
    //---------------------------------------------------------------------------------
    private SqlCommand CreateGetAllTopCommandWithStoredProcedureWithParameters(string spName, SqlConnection con, string email)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;          // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        // Add parameters
        cmd.Parameters.AddWithValue("@Email", email);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method read all bottom items from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Item> GetAllBottom(string email)
    {
        SqlConnection con;
        SqlCommand cmd;
        List<Item> itemsList = new List<Item>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw ex;
        }

        cmd = CreateGetAllBottomCommandWithStoredProcedureWithParameters("sp_LAL_GetBottomItemsByUser", con, email); // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Item i = new Item();
                //string item_code_flag = dataReader["Item_Code"].ToString();
                i.Item_ID = Convert.ToInt32(dataReader["Item_ID"]);
                i.Item_Code = Convert.ToInt32(dataReader["Item_Code"]);
                i.Name = dataReader["Name"].ToString();
                i.Image = dataReader["Image"].ToString();
                i.Color_Code = dataReader["Color_Code"].ToString();
                i.Season = dataReader["Season"].ToString();
                i.Size = dataReader["Size"].ToString();
                i.Brand_ID = Convert.ToInt32(dataReader["Brand_ID"]);
                i.Price = Convert.ToDouble(dataReader["Price"]);
                i.Is_Favorite = dataReader.GetBoolean(dataReader.GetOrdinal("Is_Favorite"));
                i.Status = dataReader["Status"].ToString();
                i.User_Email = dataReader["Email"].ToString();
                i.ClothingType_ID = Convert.ToInt32(dataReader["Clothing_Type_ID"]);

                itemsList.Add(i);
            }
            return itemsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw ex;
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //---------------------------------------------------------------------------------
    // Create the command with stored procedure and parameters
    //---------------------------------------------------------------------------------
    private SqlCommand CreateGetAllBottomCommandWithStoredProcedureWithParameters(string spName, SqlConnection con, string email)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;          // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        // Add parameters
        cmd.Parameters.AddWithValue("@Email", email);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Brands from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Brand> ReadAllBrands()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<Brand> BrandList = new List<Brand>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateBrandCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadBrands", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Brand b = new Brand();
                b.Id = Convert.ToInt32(dataReader["ID"]);
                b.BrandName = dataReader["Brand_Name"].ToString();
                BrandList.Add(b);
            }
            return BrandList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateBrandCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Brands from the database 
    //--------------------------------------------------------------------------------------------------
    public List<ClothingType> ReadAllClothingTypes()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<ClothingType> ClothingType_List = new List<ClothingType>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = ReadClothingTypesCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadAllClothingTypes", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                ClothingType ct = new ClothingType();
                ct.Id = Convert.ToInt32(dataReader["ID"]);
                ct.Clothing_Type = dataReader["Clothing_Type"].ToString();
                ct.Clothing_Part = dataReader["Clothing_Part"].ToString();
                ClothingType_List.Add(ct);
            }
            return ClothingType_List;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand ReadClothingTypesCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Brands from the database 
    //--------------------------------------------------------------------------------------------------
    public List<UserFollowers> ReadAllFollowers()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<UserFollowers> UserFollowers_List = new List<UserFollowers>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = ReadAllUserFollowersTypesCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadAllFollowers", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                UserFollowers uf = new UserFollowers();
                uf.Follower_Email = dataReader["Follower_Email"].ToString();
                uf.Following_Email = dataReader["Following_Email"].ToString();
                UserFollowers_List.Add(uf);
            }
            return UserFollowers_List;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand ReadAllUserFollowersTypesCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a Follower to the Items table 
    //--------------------------------------------------------------------------------------------------
    public int InsertNewFollower(UserFollowers uf)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateNewFollowInsertCommandWithStoredProcedure("sp_LAL_InsertNewFollower", con, uf);  // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for Insert Item using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateNewFollowInsertCommandWithStoredProcedure(String spName, SqlConnection con, UserFollowers userFollowers)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Follower_Email", userFollowers.Follower_Email);
        cmd.Parameters.AddWithValue("@Following_Email", userFollowers.Following_Email);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method read all bottom items from the database 
    //--------------------------------------------------------------------------------------------------
    public List<object> SearchUserFollowers(string email)
    {
        SqlConnection con;
        SqlCommand cmd;
        List<object> UserFollowers_List = new List<object>();
        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = ReadAllUserFollowersByEmailWithStoredProcedureWithParameters("sp_LAL_ReadTheFollowersWithFullName", con, email);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                var FollowerObj = new
                {
                    Following_Email = dataReader["Following_Email"].ToString(),
                    Follower_Email = dataReader["Follower_Email"].ToString(),
                    UserYouFollow_Full_Name = dataReader["Following_Full_Name"].ToString(),
                };
                UserFollowers_List.Add(FollowerObj);

            }
            return UserFollowers_List;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //---------------------------------------------------------------------------------
    // Create the command with stored procedure and parameters
    //---------------------------------------------------------------------------------
    private SqlCommand ReadAllUserFollowersByEmailWithStoredProcedureWithParameters(string spName, SqlConnection con, string email)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;          // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        // Add parameters
        cmd.Parameters.AddWithValue("@Follower_Email", email);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads ClothingAds from the database 
    //--------------------------------------------------------------------------------------------------
    public List<ClothingAd> ReadClothingAds()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<ClothingAd> ClothingAdsList = new List<ClothingAd>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateClothingAdsCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadAllAds", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                ClothingAd ca = new ClothingAd();
                ca.Ad_ID = Convert.ToInt32(dataReader["Ad_ID"]);
                ca.User_Email = dataReader["User_Email"].ToString();
                ca.Item_ID = Convert.ToInt32(dataReader["Item_ID"]);
                ca.Price = Convert.ToDouble(dataReader["Price"]);
                ca.Address = dataReader["Address"].ToString();
                ca.Ad_Status1 = dataReader["Ad_Status"].ToString();
                ca.Condition1 = dataReader["Condition"].ToString();
                ca.Item_Image = dataReader["Image"].ToString();
                ca.Phone_Number = dataReader["Phone_Number"].ToString();
                ca.ItemName = dataReader["name"].ToString();
                ca.ClothingType_Name = dataReader["Clothing_Type"].ToString();
                ClothingAdsList.Add(ca);

            }
            return ClothingAdsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateClothingAdsCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads ClothingAds from the database 
    //--------------------------------------------------------------------------------------------------
    public List<object> ReadWithFullName()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<object> ClothingAdsList = new List<object>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateReadWithFullNameCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadAllAdsWithFullName", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {

                var ca = new
                {
                   Ad_ID = Convert.ToInt32(dataReader["Ad_ID"]),
                    User_Email = dataReader["User_Email"].ToString(),
                    Item_ID = Convert.ToInt32(dataReader["Item_ID"]),
                     Price = Convert.ToDouble(dataReader["Price"]),
                    Address = dataReader["Address"].ToString(),
                    Ad_Status1 = dataReader["Ad_Status"].ToString(),
                     Condition1 = dataReader["Condition"].ToString(),
                    Item_Image = dataReader["Image"].ToString(),
                     Phone_Number = dataReader["Phone_Number"].ToString(),
                      ItemName = dataReader["name"].ToString(),
                     ClothingType_Name = dataReader["Clothing_Type"].ToString(),
                    FullName = dataReader["FullName"].ToString(),
                    ItemSize = dataReader["Size"].ToString(),

                };
                ClothingAdsList.Add(ca);

            }
            return ClothingAdsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateReadWithFullNameCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads ClothingAds belong to the user himself
    //--------------------------------------------------------------------------------------------------
    public List<object> ReadAllUserAds(string UserMail)
    {

        SqlConnection con;
        SqlCommand cmd;
        List<object> ClothingAdsList = new List<object>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd =ReadAllItemsForSaleCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadAllMyItemsForSales", con,UserMail);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {

                var ca = new
                {
                    Ad_ID = Convert.ToInt32(dataReader["Ad_ID"]),
                    User_Email = dataReader["User_Email"].ToString(),
                    Item_ID = Convert.ToInt32(dataReader["Item_ID"]),
                    Price = Convert.ToDouble(dataReader["Price"]),
                    Address = dataReader["Address"].ToString(),
                    Ad_Status1 = dataReader["Ad_Status"].ToString(),
                    Condition1 = dataReader["Condition"].ToString(),
                    Item_Image = dataReader["Image"].ToString(),
                    ItemName = dataReader["Name"].ToString(),
                    BrandName = dataReader["Brand_Name"].ToString(),

                };
                ClothingAdsList.Add(ca);

            }
            return ClothingAdsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand ReadAllItemsForSaleCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con,string UserMail)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@User_Email", UserMail);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a ClothingAd to the Items table 
    //--------------------------------------------------------------------------------------------------
    public int Insert(ClothingAd clothingAd)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateAdInsertCommandWithStoredProcedure("sp_LAL_InsertNewAd", con, clothingAd);  // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for Insert ClothingAd using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateAdInsertCommandWithStoredProcedure(String spName, SqlConnection con, ClothingAd clothingAd)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@Item_ID", clothingAd.Item_ID);
        cmd.Parameters.AddWithValue("@Price", clothingAd.Price);
        cmd.Parameters.AddWithValue("@Ad_Status", clothingAd.Ad_Status1);
        cmd.Parameters.AddWithValue("@Address", clothingAd.Address);
        cmd.Parameters.AddWithValue("@User_Email", clothingAd.User_Email);
        cmd.Parameters.AddWithValue("@Condition", clothingAd.Condition1);


        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a ManualLook to the Items table 
    //--------------------------------------------------------------------------------------------------
    public int Insert(ManualLook manualLook)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreatemanualLookInsertCommandWithStoredProcedure("sp_LAL_InsertNewManualLook", con, manualLook);  // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for Insert ManualLook using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreatemanualLookInsertCommandWithStoredProcedure(String spName, SqlConnection con, ManualLook manualLook)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        //cmd.Parameters.AddWithValue("@Look_ID", manualLook.LookId);
        cmd.Parameters.AddWithValue("@TopSelection_ItemId", manualLook.TopSelection_ItemId);
        cmd.Parameters.AddWithValue("@ButtomSelection_ItemId", manualLook.ButtomSelection_ItemId);
        cmd.Parameters.AddWithValue("@TopSelection_Image", manualLook.TopSelection_Image);
        cmd.Parameters.AddWithValue("@ButtomSelection_Image", manualLook.ButtomSelection_Image);
        cmd.Parameters.AddWithValue("@CreatedDateDateTime", manualLook.CreatedDate);
        cmd.Parameters.AddWithValue("@CalendarDateDateTime", manualLook.CalendarDate);
        cmd.Parameters.AddWithValue("@UserEmail", manualLook.UserEmail);


        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads ClothingAds from the database 
    //--------------------------------------------------------------------------------------------------
    public List<object> ReadLookFullDetails(string UserMail)
    {

        SqlConnection con;
        SqlCommand cmd;
        List<object> LooksList = new List<object>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreatelooksListCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadFullLookDetails", con , UserMail);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {

                var look = new
                {
                    Look_ID = Convert.ToInt32(dataReader["Look_ID"]),
                    TopSelection_ItemId = Convert.ToInt32(dataReader["TopSelection_ItemId"]),
                    TopSelection_Image = dataReader["TopSelection_Image"].ToString(),
                    Top_Item_Name = dataReader["Top_Item_Name"].ToString(),
                    ButtomSelection_ItemId = Convert.ToInt32(dataReader["ButtomSelection_ItemId"]),
                    ButtomSelection_Image = dataReader["ButtomSelection_Image"].ToString(),
                    Bottom_Item_Name = dataReader["Bottom_Item_Name"].ToString(),
                    CreatedDate = (DateTime)dataReader["CreatedDate"],
                    CalendarDate = (DateTime)dataReader["CalendarDate"],
            };
                LooksList.Add(look);

            }
            return LooksList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreatelooksListCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con , string UserMail)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@UserEmail", UserMail);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Manual Looks from the database 
    //--------------------------------------------------------------------------------------------------
    public List<ManualLook> ReadAllManualLook()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<ManualLook> ManualLooksList = new List<ManualLook>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateManualLookCommandWithStoredProcedureWithoutParameters("sp_LAL_ReadAllManualLook", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                ManualLook ml = new ManualLook();
                ml.LookId = Convert.ToInt32(dataReader["Look_ID"]);
                ml.TopSelection_ItemId = Convert.ToInt32(dataReader["TopSelection_ItemId"]);
                ml.ButtomSelection_ItemId = Convert.ToInt32(dataReader["ButtomSelection_ItemId"]);
                ml.TopSelection_Image = dataReader["TopSelection_Image"].ToString();
                ml.ButtomSelection_Image = dataReader["ButtomSelection_Image"].ToString();
                // Retrieve Date_of_birth as DateTime
                DateTime CreatedDate = (DateTime)dataReader["CreatedDate"];
                ml.CreatedDate = CreatedDate;
                DateTime CalendarDate = (DateTime)dataReader["CalendarDate"];
                ml.CalendarDate = CalendarDate;
                ml.UserEmail = dataReader["UserEmail"].ToString();
                ManualLooksList.Add(ml);

            }
            return ManualLooksList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateManualLookCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Manual Looks from the database 
    //--------------------------------------------------------------------------------------------------
    public List<ManualLook> ReadAllManualLookByEmail(string email)
    {

        SqlConnection con;
        SqlCommand cmd;
        List<ManualLook> ManualLooksList = new List<ManualLook>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = ReadAllLooksByEmailWithStoredProcedureWithoutParameters("sp_LAL_ReadAllManualLookByMail", con, email);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                ManualLook ml = new ManualLook();
                ml.LookId = Convert.ToInt32(dataReader["Look_ID"]);
                ml.TopSelection_ItemId = Convert.ToInt32(dataReader["TopSelection_ItemId"]);
                ml.ButtomSelection_ItemId = Convert.ToInt32(dataReader["ButtomSelection_ItemId"]);
                ml.TopSelection_Image = dataReader["TopSelection_Image"].ToString();
                ml.ButtomSelection_Image = dataReader["ButtomSelection_Image"].ToString();
                // Retrieve Date_of_birth as DateTime
                DateTime CreatedDate = (DateTime)dataReader["CreatedDate"];
                ml.CreatedDate = CreatedDate;
                DateTime CalendarDate = (DateTime)dataReader["CalendarDate"];
                ml.CalendarDate = CalendarDate;
                ml.UserEmail = dataReader["UserEmail"].ToString();
                ManualLooksList.Add(ml);

            }
            return ManualLooksList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand ReadAllLooksByEmailWithStoredProcedureWithoutParameters(String spName, SqlConnection con, string email)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@UserEmail", email);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts a new Pop up to the PopUps table 
    //--------------------------------------------------------------------------------------------------
    public int InsertNewPopUp(PopUp popup)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateNewPopUpWithStoredProcedure("SP_LAL_CreateNewPopUp", con, popup);  // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for Insert ManualLook using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateNewPopUpWithStoredProcedure(String spName, SqlConnection con, PopUp popup)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@UserMail", popup.UserMail);
        cmd.Parameters.AddWithValue("@StartDate", popup.StartDate);
        cmd.Parameters.AddWithValue("@EndDate", popup.EndDate);
        cmd.Parameters.AddWithValue("@Status", popup.Status);
        cmd.Parameters.AddWithValue("@PopUp_Name", popup.PopUp_Name);
        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Manual Looks from the database 
    //--------------------------------------------------------------------------------------------------
    public List<PopUp> ReadAllPopUps()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<PopUp> PopUpsList = new List<PopUp>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = ReadAllPopUpsWithStoredProcedure("sp_LAL_ReadAllPopUps", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                PopUp pu = new PopUp();
                pu.PopUpId = Convert.ToInt32(dataReader["Id"]);
                pu.UserMail = dataReader["UserMail"].ToString();
                pu.StartDate= (DateTime)dataReader["StartDate"];
                pu.EndDate= (DateTime)dataReader["EndDate"];
                pu.Status = Convert.ToBoolean(dataReader["Status"]); // Reading the Status field
                pu.PopUp_Name = dataReader["PopUp_Name"].ToString();
                PopUpsList.Add(pu);

            }
            return PopUpsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand ReadAllPopUpsWithStoredProcedure(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method read all bottom items from the database 
    //--------------------------------------------------------------------------------------------------
    public List<PopUp> ReadPopUpsByEmail(string email)
    {
        SqlConnection con;
        SqlCommand cmd;
        List<PopUp> PopUpsList = new List<PopUp>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = ReadAllPopUpsByEmailWithStoredProcedureWithParameters("sp_LAL_ReadAllPopUpsByEmail", con, email);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                PopUp pu = new PopUp();
                pu.PopUpId = Convert.ToInt32(dataReader["Id"]);
                pu.UserMail = dataReader["UserMail"].ToString();
                pu.StartDate = (DateTime)dataReader["StartDate"];
                pu.EndDate = (DateTime)dataReader["EndDate"];
                pu.Status = Convert.ToBoolean(dataReader["Status"]); // Reading the Status field
                pu.PopUp_Name = dataReader["PopUp_Name"].ToString();
                PopUpsList.Add(pu);

            }
            return PopUpsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //---------------------------------------------------------------------------------
    // Create the command with stored procedure and parameters
    //---------------------------------------------------------------------------------
    private SqlCommand ReadAllPopUpsByEmailWithStoredProcedureWithParameters(string spName, SqlConnection con, string email)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;          // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        // Add parameters
        cmd.Parameters.AddWithValue("@UserMail", email);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method Inserts Pop up Dtetails to the PopUp Details table 
    //--------------------------------------------------------------------------------------------------
    public int InsertNewPopupDetails(PopupDetails popupdetails)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateNewPopupDetailsWithStoredProcedure("sp_LAL_InsertPopUpDetails", con, popupdetails);  // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand for Insert Pop up Dtetails using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateNewPopupDetailsWithStoredProcedure(String spName, SqlConnection con, PopupDetails popupdetails)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@PopUpId", popupdetails.Id);
        cmd.Parameters.AddWithValue("@UserMail", popupdetails.Email);
        cmd.Parameters.AddWithValue("@ItemId", popupdetails.ItemId);
        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads active pop ups with the user details
    //--------------------------------------------------------------------------------------------------
    public List<object> GetAllPopsUpsThatAreActive()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<object> PopUpsList = new List<object>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = ReadAllActivePopUpsWithStoredProcedure("sp_LAL_GetAllPopsUpsThatAreActive", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                var PopUp = new
                {
                    //
                    User_Email = dataReader["Email"].ToString(),
                    FullUserName = dataReader["FullName"].ToString(),
                    UserImage = Convert.IsDBNull(dataReader["Image"]) ? string.Empty : dataReader["Image"].ToString(),
                    PopUp_Id = Convert.ToInt32(dataReader["Id"]),
                    PopUp_Name = dataReader["PopUp_Name"].ToString(),
                    StartDate = (DateTime)dataReader["StartDate"],
                    EndDate = (DateTime)dataReader["EndDate"],
                    Status = Convert.ToBoolean(dataReader["Status"]),
                };
                PopUpsList.Add(PopUp);
            }
            return PopUpsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand ReadAllActivePopUpsWithStoredProcedure(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads Pop up Dtetails from the database 
    //--------------------------------------------------------------------------------------------------
    public List<object> ReadAllPopUpItems(string UserMail, int PopUpId)
    {

        SqlConnection con;
        SqlCommand cmd;
        List<object> PopupDetailsList = new List<object>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = ReadPopupDetailsWithStoredProcedure("sp_LAL_ReadSpecficPopUpDetails", con, UserMail, PopUpId);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                int Item_CodeCheck = 0;
                string item_code_flag = dataReader["Item_Code"].ToString();
                if (item_code_flag == "")
                {
                    Item_CodeCheck = 999;
                }
                else
                {
                    Item_CodeCheck = Convert.ToInt32(dataReader["Item_Code"]);
                }

                var pds = new
                {
                    PopUp_Id = Convert.ToInt32(dataReader["PopUpId"]),
                    ItemId = Convert.ToInt32(dataReader["Item_ID"]),
                    Item_Code = Item_CodeCheck,
                    ItemName = dataReader["Name"].ToString(),
                    ItemImage = Convert.IsDBNull(dataReader["Image"]) ? string.Empty : dataReader["Image"].ToString(),
                    Color_Code = dataReader["Color_Code"].ToString(),
                    Season = dataReader["Season"].ToString(),
                    ItemSize = dataReader["Size"].ToString(),
                    ItemBrand = dataReader["Brand"].ToString(),
                    Price = Convert.ToDouble(dataReader["Price"]),
                    Is_Favorite = dataReader.GetBoolean(dataReader.GetOrdinal("Is_Favorite")),
                    Status = dataReader["Status"].ToString(),
                    User_Email = dataReader["Email"].ToString(),
                    ClothingType = dataReader["Clothing_Type"].ToString(),
                    UserEmail = dataReader["Email"].ToString(),
                };

                PopupDetailsList.Add(pds);
            }
            return PopupDetailsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand ReadPopupDetailsWithStoredProcedure(String spName, SqlConnection con, string UserMail, int PopUpId)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@UserMail", UserMail);

        cmd.Parameters.AddWithValue("@PopUpId", PopUpId);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method insert item to Pop up
    //--------------------------------------------------------------------------------------------------
    public int InsertItemToPopUp(Item item, int popUpId, string userMail)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateInsertItemToPopUpCommand("sp_LAL_AddItemToPopUp", con, item, popUpId, userMail); // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    private SqlCommand CreateInsertItemToPopUpCommand(string spName, SqlConnection con, Item item, int popUpId, string userMail)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object
        cmd.Connection = con;              // assign the connection to the command object
        cmd.CommandText = spName;          // stored procedure name
        cmd.CommandTimeout = 10;           // timeout in seconds
        cmd.CommandType = CommandType.StoredProcedure; // the type of the command

        cmd.Parameters.AddWithValue("@item_name", item.Name);
        cmd.Parameters.AddWithValue("@item_image", item.Image);
        cmd.Parameters.AddWithValue("@color_code", item.Color_Code);
        cmd.Parameters.AddWithValue("@season", item.Season);
        cmd.Parameters.AddWithValue("@size", item.Size);
        cmd.Parameters.AddWithValue("@brand_id", item.Brand_ID);
        cmd.Parameters.AddWithValue("@price", item.Price);
        cmd.Parameters.AddWithValue("@is_favorite", item.Is_Favorite);
        cmd.Parameters.AddWithValue("@status", item.Status);
        cmd.Parameters.AddWithValue("@email", item.User_Email);
        cmd.Parameters.AddWithValue("@clothing_type_id", item.ClothingType_ID);
        cmd.Parameters.AddWithValue("@pop_up_id", popUpId);
        cmd.Parameters.AddWithValue("@user_mail", userMail);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method update Item Status And DeleteAd
    //----------------------------------------------------------------------------------------------
    public bool UpdateItemStatusAndDeleteAd(int itemId, int statusCheck)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = new SqlCommand("UpdateItemStatusAndDeleteAd", con)
        {
            CommandType = CommandType.StoredProcedure
        };

        cmd.Parameters.AddWithValue("@Item_ID", itemId);
        cmd.Parameters.AddWithValue("@StatusCheck", statusCheck);

        try
        {
            cmd.ExecuteNonQuery(); // execute the command
            return true;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method update Item Status to deleted
    //----------------------------------------------------------------------------------------------
    public bool DeleteItemFromDatabase(int itemId)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = new SqlCommand("sp_LAL_DeleteItem", con)
        {
            CommandType = CommandType.StoredProcedure
        };

        cmd.Parameters.AddWithValue("@ItemID", itemId);

        try
        {
            cmd.ExecuteNonQuery(); // execute the command
            return true;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //--------------------------------------------------------------------------------------------------
    // This method Update the number of enteris into friend closet
    //--------------------------------------------------------------------------------------------------
    public int AddOrUpdateEntry(string adminUserMail, string closetMail)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateAddOrUpdateEntryCommand("LAl_AddOrUpdateEntryInside_CountEntriesTable", con, adminUserMail, closetMail); // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    private SqlCommand CreateAddOrUpdateEntryCommand(string spName, SqlConnection con, string adminUserMail, string closetMail)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object
        cmd.Connection = con; // connect the command to the connection
        cmd.CommandText = spName; // set the stored procedure name
        cmd.CommandType = CommandType.StoredProcedure; // set the command type to stored procedure

        // Add the parameters to the command
        cmd.Parameters.AddWithValue("@AdminUserMail", adminUserMail);
        cmd.Parameters.AddWithValue("@ClosetMail", closetMail);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method insert like to likes_table
    //--------------------------------------------------------------------------------------------------
    public int InsertlikeToLikesTable(string Liker_Email , string Liked_Email, int Item_ID)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateInsertlikeToLikesTableCommand("sp_LAL_AddLike", con, Liker_Email, Liked_Email, Item_ID); // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    private SqlCommand CreateInsertlikeToLikesTableCommand(string spName, SqlConnection con, string Liker_Email, string Liked_Email, int Item_ID)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object
        cmd.Connection = con;              // assign the connection to the command object
        cmd.CommandText = spName;          // stored procedure name
        cmd.CommandTimeout = 10;           // timeout in seconds
        cmd.CommandType = CommandType.StoredProcedure; // the type of the command

        cmd.Parameters.AddWithValue("@Liker_Email", Liker_Email);
        cmd.Parameters.AddWithValue("@Liked_Email", Liked_Email);
        cmd.Parameters.AddWithValue("@Item_ID", Item_ID);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads All friend itmes with likes
    //--------------------------------------------------------------------------------------------------
    public List<object> GetAllItemsByUserClosetWithLikesDB (string AdminUserMail, string ClosetOwnerMail)
    {

        SqlConnection con;
        SqlCommand cmd;
        List<object> ItemsWithLikesList = new List<object>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = ReadAllItemsWithLikesWithStoredProcedure("sp_LAL_ReadAllFriendItemsWithLikes", con, AdminUserMail, ClosetOwnerMail);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {


                var ItemToRead = new
                {
                    ItemId = Convert.ToInt32(dataReader["Item_ID"]),
                    ItemName = dataReader["Name"].ToString(),
                    ItemImage = Convert.IsDBNull(dataReader["Image"]) ? string.Empty : dataReader["Image"].ToString(),
                    Color_Code = dataReader["Color_Code"].ToString(),
                    Season = dataReader["Season"].ToString(),
                    ItemSize = dataReader["Size"].ToString(),
                    ItemBrand = dataReader["Brand_Name"].ToString(),
                    Price = Convert.ToDouble(dataReader["Price"]),
                    User_Email = dataReader["Email"].ToString(),
                    ClothingType = dataReader["Clothing_Type"].ToString(),
                    IsLiked = Convert.ToInt32(dataReader["IsLiked"])
                };

                ItemsWithLikesList.Add(ItemToRead);
            }
            return ItemsWithLikesList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand ReadAllItemsWithLikesWithStoredProcedure(String spName, SqlConnection con, string AdminUserMail, string ClosetOwnerMail)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@UserMail", AdminUserMail);

        cmd.Parameters.AddWithValue("@ClosetOwnerMail", ClosetOwnerMail);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads All friend itmes with likes
    //--------------------------------------------------------------------------------------------------
    public List<object> GetLikedItemsForHomePageDB(string AdminUserMail)
    {

        SqlConnection con;
        SqlCommand cmd;
        List<object> ItemsWithLikesList = new List<object>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = ReadLikedItemsByUserMail("sp_LAL_GetLikedItemsForHomePage", con, AdminUserMail);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {


                var LikedItem = new
                {
                    AdminMail = dataReader["Liker_Email"].ToString(),
                    TheItemMail = dataReader["Liked_Email"].ToString(),
                    ItemId = Convert.ToInt32(dataReader["Item_ID"]),
                    ItemImage = Convert.IsDBNull(dataReader["Image"]) ? string.Empty : dataReader["Image"].ToString(),
                    ItemName = dataReader["Name"].ToString(),
                };

                ItemsWithLikesList.Add(LikedItem);
            }
            return ItemsWithLikesList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand ReadLikedItemsByUserMail(String spName, SqlConnection con,string AdminUserMail)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@AdminUserMail", AdminUserMail);

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // This method reads colors from the database 
    //--------------------------------------------------------------------------------------------------
    public List<Colors> ReadColors()
    {

        SqlConnection con;
        SqlCommand cmd;
        List<Colors> ColorsList = new List<Colors>();

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        cmd = CreateColorCommandWithStoredProcedureWithoutParameters("sp_LAL_GetAllColors", con);   // create the command

        try
        {
            SqlDataReader dataReader = cmd.ExecuteReader(CommandBehavior.CloseConnection);

            while (dataReader.Read())
            {
                Colors c = new Colors();
                c.Color_name = dataReader.GetString("color_name");
                ColorsList.Add(c);
            }
            return ColorsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure
    //---------------------------------------------------------------------------------
    private SqlCommand CreateColorCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 20;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        return cmd;
    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand to delete like from likes table
    //---------------------------------------------------------------------------------
    public bool DeleteLike(string adminUserMail, string closetUserMail, int itemId)
    {
        SqlConnection con = null;
        SqlCommand cmd = null;

        try
        {
            con = connect("myProjDB"); // create the connection

            // Create the SQL command for deletion
            cmd = CreateDeleteLikeCommand(adminUserMail, closetUserMail, itemId, con);

            int rowsAffected = cmd.ExecuteNonQuery();
            return rowsAffected > 0;
        }
        catch (Exception ex)
        {
            // write to log
            throw new Exception($"Error deleting like: {ex.Message}");
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand to delete like from likesTable
    //---------------------------------------------------------------------------------
    private SqlCommand CreateDeleteLikeCommand(string adminUserMail, string closetUserMail, int itemId, SqlConnection con)
    {
        string query = "DELETE FROM LAL_LikesTable WHERE Liker_Email = @AdminUserMail AND Liked_Email = @ClosetUserMail AND Item_ID = @ItemId";
        SqlCommand cmd = new SqlCommand(query, con);
        cmd.Parameters.AddWithValue("@AdminUserMail", adminUserMail);
        cmd.Parameters.AddWithValue("@ClosetUserMail", closetUserMail);
        cmd.Parameters.AddWithValue("@ItemId", itemId);
        return cmd;
    }

    //---------------------------------------------------------------------------------
    // This method deletes friend data from tables
    //---------------------------------------------------------------------------------
    public bool DeleteFriendFromData(string AdminMail, string FriendMail)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw new Exception($"Error connecting to database: {ex.Message}");
        }

        cmd = CreateDeleteFriendCommandWithStoredProcedure("sp_LAL_DeleteFriend", con, AdminMail, FriendMail); // create the command

        try
        {
            int rowsAffected = cmd.ExecuteNonQuery();
            return rowsAffected <0;
        }
        catch (Exception ex)
        {
            // write to log
            throw new Exception($"Error deleting friend data: {ex.Message}");
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure with parameters
    //---------------------------------------------------------------------------------
    private SqlCommand CreateDeleteFriendCommandWithStoredProcedure(string spName, SqlConnection con, string AdminMail, string FriendMail)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;          // can be Select, Insert, Update, Delete

        cmd.CommandTimeout = 10;           // Time to wait for the execution, the default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@AdminUserMail", AdminMail);
        cmd.Parameters.AddWithValue("@FriendMail", FriendMail);

        return cmd;
    }


    //---------------------------------------------------------------------------------
    // Create the SqlCommand to Update The Weater
    //---------------------------------------------------------------------------------
    public int UpdateWeatherData(WeatherData data)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // Your connection string name
        }
        catch (Exception ex)
        {
            throw new Exception("failed to connect to the server", ex);
        }

        var query = @"
                MERGE INTO LAL_WeatherData AS target
                USING (VALUES (@Date, @Season, @Temperature, @IsRainy)) AS source (Date, Season, Temperature, IsRainy)
                ON target.Date = source.Date
                WHEN MATCHED THEN 
                    UPDATE SET Season = source.Season, Temperature = source.Temperature, IsRainy = source.IsRainy
                WHEN NOT MATCHED THEN
                    INSERT (Date, Season, Temperature, IsRainy)
                    VALUES (source.Date, source.Season, source.Temperature, source.IsRainy);";

        cmd = new SqlCommand(query, con);

        cmd.Parameters.AddWithValue("@Date", data.Date);
        cmd.Parameters.AddWithValue("@Season", data.Season);
        cmd.Parameters.AddWithValue("@Temperature", data.Temperature);
        cmd.Parameters.AddWithValue("@IsRainy", data.IsRainy);

        try
        {
            int numEffected = cmd.ExecuteNonQuery();
            return numEffected;
        }
        catch (Exception ex)
        {
            throw new Exception("Failed to update weather data", ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }
        }
    }

    //---------------------------------------------------------------------------------
    // This method retrieves the top three looks for a user
    //---------------------------------------------------------------------------------
    public List<TopThreeLooksResult> GetTopThreeLooks(string userEmail, DateTime? date)
    {
        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("myProjDB"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw new Exception($"Error connecting to database: {ex.Message}");
        }

        cmd = CreateGetTopThreeLooksCommandWithStoredProcedure("sp_LAL_GetTopThreeLooks", con, userEmail, date); // create the command

        List<TopThreeLooksResult> results = new List<TopThreeLooksResult>();

        try
        {
            SqlDataReader reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                TopThreeLooksResult look = new TopThreeLooksResult
                {
                    TopItemID = reader.GetInt32(0),
                    TopName = reader.GetString(1),
                    TopImage = reader.GetString(2),
                    BottomItemID = reader.GetInt32(3),
                    BottomName = reader.GetString(4),
                    BottomImage = reader.GetString(5)
                };
                results.Add(look);
            }

            return results;
        }
        catch (Exception ex)
        {
            // write to log
            throw new Exception($"Error retrieving top three looks: {ex.Message}");
        }
        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand using a stored procedure with parameters
    //---------------------------------------------------------------------------------
    private SqlCommand CreateGetTopThreeLooksCommandWithStoredProcedure(string spName, SqlConnection con, string userEmail, DateTime? date)
    {
        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = spName;          // can be Select, Insert, Update, Delete

        cmd.CommandTimeout = 10;           // Time to wait for the execution, the default is 30 seconds

        cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

        cmd.Parameters.AddWithValue("@UserEmail", userEmail);
        cmd.Parameters.AddWithValue("@Date", date.HasValue ? (object)date.Value : DBNull.Value);

        return cmd;
    }


    ////---------------------------------------------------------------------------------
    //// Create the SqlCommand using a stored procedure
    ////---------------------------------------------------------------------------------
    //private SqlCommand CreateCommandWithStoredProcedureWithoutParameters(String spName, SqlConnection con)
    //{

    //    SqlCommand cmd = new SqlCommand(); // create the command object

    //    cmd.Connection = con;              // assign the connection to the command object

    //    cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

    //    cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

    //    cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

    //    return cmd;
    //}

}