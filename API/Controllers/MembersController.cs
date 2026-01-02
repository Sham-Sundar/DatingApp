using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BaseAPIController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {
            return Ok(await memberRepository.GetMembersAsync());

            // Wrap result in Ok(...) to return a proper HTTP 200 response.
            // Without Ok, the compiler cannot convert IReadOnlyList<Member> directly to ActionResult<IReadOnlyList<Member>,
            // so this avoids the type mismatch warning when returning lists from the repository.
        }


        [HttpGet("{id}")] // localhost:5001/api/members/bob-id
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            var member = await memberRepository.GetMemberByIdAsync(id);
            if (member == null) return NotFound();

            return member;
        }

        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhotos(string id)
        {
            return Ok(await memberRepository.GetPhotosForMemberAsync(id));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMember(MemberUpdateDTO memberUpdateDto)
        {
            //its an extension method to get the user-id / member-id from the token using ClaimsPrincipal
            var memberId = User.GetMemberId();
            
            var member = await memberRepository.GetMemberForUpdate(memberId);
            
            if (member == null) return BadRequest("Could not get the member");

            member.DisplayName = memberUpdateDto.DisplayName ?? member.DisplayName;
            member.Description = memberUpdateDto.Description ?? member.Description;
            member.City = memberUpdateDto.City ?? member.City;
            member.Country = memberUpdateDto.Country ?? member.Country;

            member.User.DisplayName = memberUpdateDto.DisplayName ?? member.User.DisplayName;

            memberRepository.Update(member); //optional

            if (await memberRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update member");
        }
    }
}
