use md5::Md5;
use sha1::Sha1;
use sha2::{Sha256, Sha512, Digest};

#[derive(serde::Serialize)]
pub struct HashResult {
    pub md5: String,
    pub sha1: String,
    pub sha256: String,
    pub sha512: String,
}

#[tauri::command]
pub fn generate_hashes(input: String) -> HashResult {
    HashResult {
        md5:    hex::encode(Md5::digest(input.as_bytes())),
        sha1:   hex::encode(Sha1::digest(input.as_bytes())),
        sha256: hex::encode(Sha256::digest(input.as_bytes())),
        sha512: hex::encode(Sha512::digest(input.as_bytes())),
    }
}
