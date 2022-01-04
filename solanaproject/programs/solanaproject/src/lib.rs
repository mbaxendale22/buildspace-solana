use anchor_lang::prelude::*;

declare_id!("grp6AZmNGrdgf2fnsboA8YqKfieAvxcb1dgay1ZaJUa");

#[program]
pub mod solanaproject {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
