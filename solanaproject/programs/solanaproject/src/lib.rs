use anchor_lang::prelude::*;

declare_id!("grp6AZmNGrdgf2fnsboA8YqKfieAvxcb1dgay1ZaJUa");

#[program]
pub mod solanaproject {
    use super::*;
    pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> ProgramResult {
      // &mut gives a mutatable reference to base_account, so changes can be made to it directly
        let base_account = &mut ctx.accounts.base_account;
        //initialise total gifs
        base_account.total_gifs = 0;
        Ok(())
    }

    //function to increment the GIF counter
    pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> ProgramResult {
      // get a mutatable reference to base_account & user; this is coming from the context that is passed in as an arg and defined on line 37
      let base_account = &mut ctx.accounts.base_account;
      let user = &mut ctx.accounts.user;   

      // struct is a bit like a class: stores different data types (unordered?)
      let item = ItemStruct {
        gif_link: gif_link.to_string(),
        user_address: *user.to_account_info().key,
      };

      base_account.gif_list.push(item);
      base_account.total_gifs += 1;

      Ok(())
  }
}

#[derive(Accounts)]
pub struct StartStuffOff<'info> {
  // initialise BaseAccount; specifying how much space the account will take up and who will pay for it (9000 bytes)
  #[account(init, payer = user, space = 9000)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
  // 'system_program is a reference to the the program that runs Solana; it can create accounts, amongst other things.
  pub system_program: Program <'info, System>,
  
}

//specify the data in the AddGif Context.
#[derive(Accounts)]
pub struct AddGif<'info> {
  // providing a mutable reference to be accessed by the AddGif function
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
}

//define a custom struct 
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)] 
// specifies how the data is serialised when being written to/ read from the account
pub struct ItemStruct {
  pub gif_link: String,
  pub user_address: Pubkey,
} 

#[account]
// define the type of the account
pub struct BaseAccount {
  pub total_gifs: u64,
  // attach a Vector to the account (a vector seems like an array?) it will hold ItemStructs 
  pub gif_list: Vec<ItemStruct>,
}
